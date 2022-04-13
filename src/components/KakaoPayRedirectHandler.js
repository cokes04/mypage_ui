import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { approvalKakaoPay } from '../apis/PaymentApi'
import { getBuyCashKinds } from '../apis/CashApi'
import CashChargeResult from './CashChargeResult'

const KakaoPayRedirectHandler = ({pg_token, result, ...props}) => {
    const [payReuslt, setPayReuslt] = useState({})
    const [payCashKinds, setPayCashKinds] = useState({})

    useEffect( async () => {
        let tid
        try{
            tid = window.opener.document.getElementById('tid').value
        } catch(error){
            return
        }

        if(result === "approval"){
            try{
                const response = await approvalKakaoPay(pg_token, tid)
                const cashKindsRepsonse = await getBuyCashKinds()
                
                const cashKindsId = parseInt(response.data.productId)
                const payCashKindsRes = cashKindsRepsonse.data.cashKindsList.find( ck => ck.cashKindsId === cashKindsId)

                setPayReuslt(response.data)
                setPayCashKinds(payCashKindsRes)
                window.opener.success()
                

            } catch (error){
                 window.opener.failure()
            }

        }else if(result === "cancel"){
            window.opener.failure()
        }else if(result === "fail"){
            window.opener.failure()
        }else{
            window.opener.failure()
        }
    }, [])

    


    return ( !payReuslt ? <Spinner animation='border' /> : 
            <CashChargeResult payReuslt={payReuslt} payCashKinds={payCashKinds} />);
} 

export default KakaoPayRedirectHandler;