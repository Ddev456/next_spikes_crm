"use client";

import Loader from "@/components/Loader";
import { useState } from "react";
export default function Loading() {
    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
    }, 1000);
    return loading && (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Loader />
        </div>
    );
}
