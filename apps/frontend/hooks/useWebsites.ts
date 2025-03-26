// "use client";

// import { useAuth } from "@clerk/nextjs";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { API_BACKEND_URL } from "../config";

// interface Website {
//     id: string;
//     url: string;
//     ticks: {
//         id: string;
//         createdAt: string;
//         status: string;
//         latency: number;
//     }
    
// }

// export function useWebsites() {
//     const { getToken } = useAuth();
//     const [websites, setWebsites] = useState<any[]>([]);
//     const [loading, setLoading] = useState(false);          
//     async function refreshWebsites() {
//         const token =  await getToken();
//         setLoading(true);
//         const response = axios.get(`${API_BACKEND_URL}/api/vi/websites`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
        
//          setWebsites((await response).data.websites)
//          setLoading(false);
//     }
//     useEffect(() => {
//        refreshWebsites();

//        const interval = setInterval(() => {
//            refreshWebsites();
//        }, 1000 * 60 * 1);

//        return () => {   
//            clearInterval(interval);
//         }
//         },[]);

//         return { websites, loading, refreshWebsites };
//     }
"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { API_BACKEND_URL } from "../config";

// Define types for better type safety
export interface WebsiteTick {
  id: string;
  createdAt: string;
  status: string;
  latency: number;
}

export interface Website {
  id: string;
  url: string;
  name?: string;
  ticks: WebsiteTick[];
}

export function useWebsites() {
  const { getToken } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use useCallback to avoid unnecessary re-renders
  const refreshWebsites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = await getToken();
      
      if (!token) {
        throw new Error("Authentication token is missing");
      }
      
      const response = await axios.get(`${API_BACKEND_URL}/api/v1/websites`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("API URL:", API_BACKEND_URL);

      // Validate response structure
      if (!response.data || !Array.isArray(response.data.websites)) {
        throw new Error("Invalid response format from API");
      }
      
      setWebsites(response.data.websites);
    } catch (err) {
      console.error("Error fetching websites:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch websites");
      // Keep previous data in case of error
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    // Initial fetch
    refreshWebsites();
    
    // Set up interval for periodic refreshes
    const interval = setInterval(() => {
      refreshWebsites();
    }, 60000); // Refresh every minute
    
    // Clean up interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [refreshWebsites]); // Include refreshWebsites in dependency array

  return { websites, loading, error, refreshWebsites };
}