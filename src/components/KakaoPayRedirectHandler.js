import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { approvalKakaoPay } from '../apis/PaymentApi'
import { getBuyCashKinds } from '../apis/CashApi'
import CashChargeResult from './CashChargeResult'

const KakaoPayRedirectHandler = ({pg_token, result, ...props}) => {
    const [payReuslt, setPayReuslt] = useState({})
    const [payCashKinds, setPayCashKinds] = useState({})

    useEffect( () => {
        const request = async () => {
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
                    
                    const cashKindsId = Number(response.data.productNumber)
                    const paidCashKindsRes = cashKindsRepsonse.data.cashKindsList.find( ck => ck.cashKindsId === cashKindsId)

                    setPayReuslt(response.data)
                    setPayCashKinds(paidCashKindsRes)
                    window.opener.success()
                    

                } catch (error){
                    window.opener.failure()
                    window.close()
                }

            }else if(result === "cancel"){
                window.opener.failure()
                window.close()
            }else if(result === "fail"){
                window.opener.failure()
                window.close()
            }else{
                window.opener.failure()
                window.close()
            }
        } 
        request()
    }, [])

    


    return ( !payReuslt ? <Spinner animation='border' /> : 
            <CashChargeResult payReuslt={payReuslt} payCashKinds={payCashKinds} />);
} 

export default KakaoPayRedirectHandler;