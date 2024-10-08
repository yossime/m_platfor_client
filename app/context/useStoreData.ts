"use client"
import { Store } from '@/components/dashboard/types/store';
import { getStoreData } from '@/services/storeService';
import { useState, useEffect } from 'react';



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

    return {setStoreData, storeData, loading, refreshStoreData: fetchStoreData };
};