import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsSHA from 'jssha';
import museum from '../images/museum.png';
import map from '../images/map.png';
import { useMyContext } from '../context/context';
// 引入components
import Spinner from '../components/Spinner';

function Detail() {
  const { id } = useParams();
  const { detail, setDetail } = useMyContext();
  const [detailIsLoading, setDetailIsLoading] = useState(true);

  useEffect(() => {
    // 先開起載入指示器
    setDetailIsLoading(true);

    const getAllAttractionsData = async () => {
      try {
        const detailRes = await axios.get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=contains(ID,%27${id}%27)&$format=JSON`,
          {
            headers: getAuthorizationHeader(),
          }
        );
        setDetail(detailRes.data[0]);
        console.log('detailRes.data[0]', detailRes.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    // console.log('detail[0]', detail[0].Name);
    getAllAttractionsData();

    // 1.5秒後關閉指示器
    setTimeout(() => {
      setDetailIsLoading(false);
    }, 1500);
  }, []);

  // API ID & KEY 加密
  const getAuthorizationHeader = () => {
    //  填入自己 ID、KEY 開始
    let AppID = process.env.REACT_APP_TDX_APP_ID;
    let AppKey = process.env.REACT_APP_TDX_APP_KEY;
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization =
      'hmac username="' +
      AppID +
      '", algorithm="hmac-sha1", headers="x-date", signature="' +
      HMAC +
      '"';
    return { Authorization: Authorization, 'X-Date': GMTString };
  };
  // console.log('detailIsLoading', detailIsLoading);
  // console.log('detail', detail);
  // console.log('detail.Picture', detail.Picture);
  // console.log('detail.Name', detail.Name);

  return (
    <>
      {detailIsLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="container mx-auto padding-top">
            <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 py-lg">
              <div>
                <img src={detail.Picture.PictureUrl1} />
              </div>
              <div className="p-md">
                <h2 className="text-3xl font-bold pb-md">{detail.Name}</h2>
                <h2 className="text-2xl font-bold pb-md">資訊</h2>
                <h3 className="text-lg font-semibold pb-sm">電話：</h3>
                <p className="pb-sm">{detail.Phone}</p>
                <h3 className="text-lg font-semibold pb-sm">地址：</h3>
                <p className="pb-sm">{detail.Address}</p>
                <h3 className="text-lg font-semibold pb-sm">開放時間：</h3>
                <p>{detail.OpenTime}</p>
              </div>
            </div>
          </div>
          <div className="bg-secondary">
            <div className="container mx-auto pb-lg">
              <h2 className="text-2xl font-bold py-md">介紹</h2>
              <p>{detail.Description}</p>
              <h2 className="text-2xl font-bold py-md">景點地圖</h2>
              <img src={map} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
