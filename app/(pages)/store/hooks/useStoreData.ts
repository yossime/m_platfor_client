"use client"
import { Store } from '@/(pages)/store/types/store';
import { getStoreData } from '@/services/storeService';
import axios from '@/utils/axios';
import { useState, useEffect } from 'react';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3500';


export const useStoreData = (storeId: string) => {
    const [currStoreId, setCurrStoreId] = useState<string>(storeId);
    const [storeData, setStoreData] = useState<Store | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setCurrStoreId(storeId);
    }, [storeId]);


    const fetchStoreData = async () => {
        try {
            const data = await getStoreData(currStoreId);
            setStoreData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStoreData();
        const intervalId = setInterval(fetchStoreData, 30000);

        return () => clearInterval(intervalId);
    }, []);

    return { storeData, loading, refreshStoreData: fetchStoreData };
};