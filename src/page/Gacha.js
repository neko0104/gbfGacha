import {useState} from "react"
import {InputElement, CountBtn, ExpBtn} from "../page/components/InputElement"

export function Gacha () {
    const [title, setTitle] = useState({today:"", target:"", no:null})
    const [countData, setCountData] = useState({ssr_w:0, ssr_s:0, sr_w:0, sr_s:0, r_w:0, r_s:0});
    const [gachaCount, setGachaCount] = useState({
      once:0,
      ten:0,
      gachapin:0,
      mukr:0,
      other:0,
      golden:0,
      limit:0,
      limit_golden:0,
      season:0,
      season_golden:0,
    });

    const [getChara, setGetChara] = useState({
      normal:"",
      limited:"",
      stone:"",
    })

    const handelInput = (e, setFn=f=>f) => {
      const {name, value, type} = e.target;
      if (type === "number") {
        return setFn(prev => ({...prev, [name]:value===""?0:parseInt(value)}))
      }
      return setFn(prev => ({...prev, [name]:value}))
    }

    const KeyIn = ({name, state, setFn=f=>f, mission=f=>f, ...props}) => {
      // console.log(state, name)
      return(
        <>
          <CountBtn name={name} method="+" state={state} setFn={setFn} className={"text-base rounded-full bg-blue-100 p-1 w-6 h-6 leading-3"}/>
          <InputElement type="number" step="1" name={name}  value={state[name]} mission={mission} className="m-2 p-1 w-[80px] text-center border rounded-lg hideArrows"/>
          <CountBtn name={name} method="-" state={state} setFn={setFn} className={"text-base rounded-full bg-blue-100 p-1 w-6 h-6 leading-3"}/>
        </>
      )
    }

    const GachaList = (props) => {
      const {text, ...attr} = props
      return <p className=" ml-3">{text}<KeyIn {...attr}/></p>
    }

    const GachaListData = [
      {text:"單抽  ", name:"once", state:gachaCount, setFn:setGachaCount, mission:e=>handelInput(e, setGachaCount)},
      {text:"十連  ", name:"ten", state:gachaCount, setFn:setGachaCount, mission:e=>handelInput(e, setGachaCount)},
      {text:"卡掐拼  ", name:"gachapin", state:gachaCount, setFn:setGachaCount, mission:e=>handelInput(e, setGachaCount)},
      {text:"穆克  ", name:"mukr", state:gachaCount, setFn:setGachaCount, mission:e=>handelInput(e, setGachaCount)},
      {text:"其他  ", name:"other", state:gachaCount, setFn:setGachaCount, mission:e=>handelInput(e, setGachaCount)},
      {text:"金月  ", name:"golden", state:gachaCount, setFn:setGachaCount, mission:e=>handelInput(e, setGachaCount)},
      {text:"LM  ", name:"limit", state:gachaCount, setFn:setGachaCount, mission:e=>handelInput(e, setGachaCount)},
      {text:"LM金月  ", name:"limit_golden", state:gachaCount, setFn:setGachaCount, mission:e=>handelInput(e, setGachaCount)},
      {text:"季限  ", name:"season", state:gachaCount, setFn:setGachaCount, mission:e=>handelInput(e, setGachaCount)},
      {text:"季限金月  ", name:"season_golden", state:gachaCount, setFn:setGachaCount, mission:e=>handelInput(e, setGachaCount)},
    ]

    const ReaTd = (props) => {
      const {text, isInput, tdClass, name, state, setFn, mission} =props;
      return (<td className={tdClass}>
        {text}
        {isInput && <KeyIn name={name} mission={mission} state={state} setFn={setFn}/>}
      </td>)
    }

    const countRatio = (ta, all) => Math.round(parseInt(ta)/parseInt(all)*10000)/100

    const SSRTdData = [
      {isInput:false, tdClass:"whitespace-nowrap px-5 py-4", text:"ＳＳＲ"},
      {isInput:true, tdClass:"whitespace-nowrap px-5 py-4 text-center", name:"ssr_w", mission:e => handelInput(e, setCountData), state:countData, setFn:setCountData},
      {isInput:true, tdClass:"whitespace-nowrap px-5 py-4 text-center", name:"ssr_s", mission:e => handelInput(e, setCountData), state:countData, setFn:setCountData},
      {isInput:false, tdClass:"whitespace-nowrap px-5 py-4 text-center max-w-[80px]", text:`${countRatio((countData.ssr_s+countData.ssr_w),(Object.values(countData).reduce((p,n)=>p+n,0)))}%`}
    ]
    const SRTdData = [
      {isInput:false, tdClass:"whitespace-nowrap px-5 py-4", text:"ＳＲ"},
      {isInput:true, tdClass:"whitespace-nowrap px-5 py-4 text-center", name:"sr_w", mission:e => handelInput(e, setCountData), state:countData, setFn:setCountData},
      {isInput:true, tdClass:"whitespace-nowrap px-5 py-4 text-center", name:"sr_s", mission:e => handelInput(e, setCountData), state:countData, setFn:setCountData},
      {isInput:false, tdClass:"whitespace-nowrap px-5 py-4 text-center max-w-[80px]", text:`${countRatio((countData.sr_s+countData.sr_w),(Object.values(countData).reduce((p,n)=>p+n,0)))}%`}
    ]
    const RTdData = [
      {isInput:false, tdClass:"whitespace-nowrap px-5 py-4", text:"Ｒ"},
      {isInput:true, tdClass:"whitespace-nowrap px-5 py-4 text-center", name:"r_w", mission:e => handelInput(e, setCountData), state:countData, setFn:setCountData},
      {isInput:true, tdClass:"whitespace-nowrap px-5 py-4 text-center", name:"r_s", mission:e => handelInput(e, setCountData), state:countData, setFn:setCountData},
      {isInput:false, tdClass:"whitespace-nowrap px-5 py-4 text-center max-w-[80px]", text:`${countRatio((countData.r_s+countData.r_w),(Object.values(countData).reduce((p,n)=>p+n,0)))}%`}
    ]

    return (
      <>
      <div id="Canvas">
        <h1>抽卡統計</h1>
        <div className="flex flex-wrap">
          <div className="mb-4 w-full md:mb-0 md:w-1/3">
            <label className="mb-2 block font-bold" htmlFor="date-input">
              下井日期
            </label>
            <input
              className="w-full appearance-none rounded border py-2 px-3"
              id="date-input"
              type="date"
            />
          </div>
          <div className="mb-4 w-full md:mb-0 md:w-1/3 md:pl-4">
            <label className="mb-2 block font-bold" htmlFor="text-input">
              井誰
            </label>
            <input
              className="w-full appearance-none rounded border py-2 px-3"
              id="text-input"
              type="text"
            />
          </div>
          <div className="w-full md:w-1/3">
            <label className="mb-2 block font-bold" htmlFor="number-input">
              第幾井
            </label>
            <input
              className="w-full appearance-none rounded border py-2 px-3"
              id="number-input"
              type="number"
            />
          </div>
        </div>
        {/* ================== table ⬇️ ================= */}
        <div className="mt-8 flex flex-wrap">
          <div className="mb-4 w-full md:mb-0 md:w-1/2 md:pr-4">
            <div>
              <p className="ml-3 font-bold">蒼光の御印：{Object.values(countData).reduce((p,n)=>p+n,0)}</p>
              <div className="columns-2">
                {GachaListData.map(v=><GachaList {...v}/>)}
              </div>
            </div>
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      稀有度
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 ">
                      武器
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                      召喚石
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                      機率
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    {SSRTdData.map(attr => (<ReaTd {...attr}/>))}
                  </tr>
                  <tr>
                    {SRTdData.map(attr => (<ReaTd {...attr}/>))}
                  </tr>
                  <tr>
                    {RTdData.map(attr => (<ReaTd {...attr}/>))}
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-5 py-4">統計</td>
                    <td className="whitespace-nowrap px-5 py-4 text-center">{countData.ssr_w+countData.sr_w+countData.r_w}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-center">{countData.ssr_s+countData.sr_s+countData.r_s}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-center min-w-[80px]">{Object.values(countData).reduce((p,n)=>p+n,0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* ================== table ⬆️ ================= */}
        <div className="mt-2 mb-2 w-full md:mb-0 md:w-1/2 md:pr-4 ">
          <TextAreaDiv name="normal" defaultValue={getChara.normal} onChange={e => handelInput(e, setGetChara)} p="出貨普池角" />
          <TextAreaDiv name="limited" defaultValue={getChara.limited} onChange={e => handelInput(e, setGetChara)} p="出貨Limit" />
          <TextAreaDiv name="stone" defaultValue={getChara.stone} onChange={e => handelInput(e, setGetChara)} p="出貨召喚石" />
        </div>
        </div>
        <div className="mt-2 mb-2 w-full md:mb-0 md:w-1/2 md:pr-4 text-center">
          <ExpBtn text="匯出excel" mission={e=>console.log(e)} />
          <ExpBtn text="匯出png" mission={e=>console.log(e)} />
        </div>
      </>
    );
}


const TextAreaDiv = (props) => {
  const {name, value, onChange, p} = props;

  return (
    <div className="rounded overflow-hidden">
      <p className="bg-gray-50 p-2  text-xs font-medium uppercase tracking-wider text-gray-500">{p}</p>
      <textarea
        className="w-full h-32 border rounded-b-lg p-3"
        value={value}
        name={name}
        onChange={onChange}
      ></textarea>
    </div>
  );
}