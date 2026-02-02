"use client"
import { useEffect, useState } from "react";
import Axios from "@/utils/Axios";
import summeryApi from "@/common/SummeryApi";

const fetchUserDetail = async()=> {
    try{
        const response = await Axios({
            ...summeryApi.userDetail
        })
        return response.data
    }catch(error){
        console.log(error)
    }

}

export default fetchUserDetail