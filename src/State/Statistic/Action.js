import { api1, api } from "../../config/apiConfig"
import { RETRIVE_MONTHLY_REVENUE_SUCCESS, RETRIVE_TOP_SELLING_FAILURE, RETRIVE_TOP_SELLING_REQUEST, RETRIVE_TOP_SELLING_SUCCESS } from "./ActionType"

export const retrieveTopSelling=()=>async(dispatch)=> {
    dispatch({type:RETRIVE_TOP_SELLING_REQUEST})
    
    try {
        const {data}= await api.get(`statistic/topSelling`)
        console.log("Top 3 sản phẩm bán chạy: ", data)
        dispatch({type: RETRIVE_TOP_SELLING_SUCCESS, payload:data})
    }
    catch(error) {
        dispatch({type:RETRIVE_TOP_SELLING_FAILURE, payload:error.message})
    }
}

export const retrieveMonthlyRevenue=(year)=>async(dispatch)=> {
    dispatch({type:RETRIVE_TOP_SELLING_REQUEST})
    
    try {
        const {data}= await api.get(`statistic/monthlyRevenue/${year}`)
        console.log("Thống kê doanh thu theo tháng: ", data)
        dispatch({type: RETRIVE_MONTHLY_REVENUE_SUCCESS, payload:data})
    }
    catch(error) {
        dispatch({type:RETRIVE_TOP_SELLING_FAILURE, payload:error.message})
    }
}