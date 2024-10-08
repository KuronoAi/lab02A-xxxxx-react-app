import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import Index from "./_index";

export default function HerbDetail(){
    const myParams = useParams();
    const hbId = myParams.hbId;
    const [hbData, setHerbData] = useState({
        hbId: '', 
        hbName: '', 
        hbDesc: '', 
        hbCate: 0, 
        hbProp: '', 
        hbSupp: '',
    });

    useEffect(() => {
        try {
            const fetchHerbData = async () => {
                const hbData = await fetch(`http://localhost:3000/api/getHerbs//${hbId}`);
                if (hbData.ok) {
                    const hbJson = await hbData.json();
                    setHerbData(hbJson);
                    console.log(hbJson);
                } else {
                    alert('[ERR] Failed to loaded data.');
                }
            }

            fetchHerbData().catch(console.error);
        } catch (error) {
            alert('[ERR] An error occurred while loading the data.');
        }
    }, []);

    return (
    <div className="m-3">
        <a href='/lab02/herbLists'>[ ข้อมูลสมุนไพร ]</a>
        <h1 className="font-bold">รายละเอียดสมุนไพร</h1>
        {
            <div key={hbId}>
                <div className="font-bold p-2 m-2 border-2 rounded-lg">
                    ชื่อสมุนไพร: {hbData.hbName}<br/>
                    รายละเอียด: {hbData.hbDesc}<br/>
                    หมวดหมู่: {hbData.hbCate}<br/>
                    สรรพคุณ: {hbData.hbProp}<br/>
                    ผู้ผลิต: {hbData.hbSupp}<br/>
                </div>
            </div>
        }
        <a href='/lab02/herbLists'>[ ย้อนกลับ ]</a>
    </div>
    );
}