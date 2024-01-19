import { useMemo } from "react";
import { utils, writeFile } from "xlsx";
import { ExpBtn } from "../page/components/InputElement";

export default function ExpExcel (props) {
    const { title, countData, gachaCount, getChara, countRatio } = props;
    const data = useMemo(() => {
        let data = [];
        data[0] = [title.today, title.target, title.no];
        data[1] = ["蒼光の御印：", Object.values(countData).reduce((p,n)=>p+n, 0)];
        data[2] = ["單抽：", gachaCount.once, "金月：", gachaCount.golden];
        data[3] = ["十連：", gachaCount.ten, "LM：", gachaCount.limit];
        data[4] = ["卡掐拼：", gachaCount.gachapin, "LM金月：", gachaCount.golden];
        data[5] = ["穆克：", gachaCount.mukr, "季限：", gachaCount.season];
        data[6] = ["其他：", gachaCount.other, "季限金月：", gachaCount.season_golden];
        data[7] = [];
        data[8] = ["稀有度", "武器", "召喚石", "出貨率"];
        data[9] = ["ＳＳＲ", countData.ssr_w, countData.ssr_s, `${countRatio((countData.ssr_s+countData.ssr_w),(Object.values(countData).reduce((p,n)=>p+n,0)))}%` ];
        data[10] = ["ＳＲ", countData.sr_w, countData.sr_s, `${countRatio((countData.sr_s+countData.sr_w),(Object.values(countData).reduce((p,n)=>p+n,0)))}%`];
        data[11] = ["Ｒ", countData.r_w, countData.r_s, `${countRatio((countData.r_s+countData.r_w),(Object.values(countData).reduce((p,n)=>p+n,0)))}%`];
        data[12] = ["合計", countData.ssr_w+countData.sr_w+countData.r_w, countData.ssr_s+countData.sr_s+countData.r_s, Object.values(countData).reduce((p,n)=>p+n,0)];
        data[13] = [];
        data[14] = ["出貨角色", "", "下井日期"];
        data[15] = [getChara.normal, "", title.today];
        data[16] = ["出貨Limited", "", "井誰"];
        data[17] = [getChara.limited, "", title.target];
        data[18] = ["出貨召喚石", "", "第幾井"];
        data[19] = [getChara.stone, "", title.no];
        data[20] = ["https://github.com/neko0104/gbfGacha"];
        return data;
    }, [title, countData, gachaCount, getChara]);

    const exportFile = () => {
        const ws = utils.aoa_to_sheet(data);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "統計")
        writeFile(wb, "gbfGacha.xlsx")
    }

    return <ExpBtn text="匯出excel" mission={exportFile} />;
}