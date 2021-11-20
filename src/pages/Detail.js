import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsSHA from 'jssha';
import museum from '../images/museum.png';
import map from '../images/map.png';
import { useMyContext } from '../context/context';
// 引入 components
import Spinner from '../components/Spinner';
// 引入 icons
import { AiOutlinePicture } from 'react-icons/ai';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Detail() {
  const { id } = useParams();
  const { detail, setDetail, setNavBtnState } = useMyContext();
  const [detailIsLoading, setDetailIsLoading] = useState(true);
  // console.log('id', id.substring(0, 2));

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
        // console.log('detailRes.data[0]', detailRes.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    // getAllAttractionsData();

    const getAllFoodData = async () => {
      try {
        const detailRes = await axios.get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=contains(ID,%27${id}%27)&$format=JSON`,
          {
            headers: getAuthorizationHeader(),
          }
        );
        setDetail(detailRes.data[0]);
        // console.log('detailRes.data[0]', detailRes.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    // getAllFoodData();

    const getAllActivitiesData = async () => {
      try {
        const detailRes = await axios.get(
          `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$filter=contains(ID,%27${id}%27)&$format=JSON`,
          {
            headers: getAuthorizationHeader(),
          }
        );
        setDetail(detailRes.data[0]);
        // console.log('detailRes.data[0]', detailRes.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    // getAllActivitiesData();

    switch (id.substring(0, 2)) {
      case 'C1':
        setNavBtnState({
          attractionsLinkClass: 'navBtn navBtn-active',
          activitiesLinkClass: 'navBtn',
          foodLinkClass: 'navBtn',
        });
        getAllAttractionsData();
        break;
      case 'C2':
        setNavBtnState({
          attractionsLinkClass: 'navBtn ',
          activitiesLinkClass: 'navBtn navBtn-active',
          foodLinkClass: 'navBtn',
        });
        getAllActivitiesData();
        break;
      case 'C3':
        setNavBtnState({
          attractionsLinkClass: 'navBtn',
          activitiesLinkClass: 'navBtn',
          foodLinkClass: 'navBtn navBtn-active',
        });
        getAllFoodData();
        break;
    }

    // 1.5秒後關閉指示器
    setTimeout(() => {
      setDetailIsLoading(false);
    }, 500);
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
  console.log('detail', detail);
  // console.log('detail.Picture', detail.Picture);
  // console.log('detail.Name', detail.Name);

  return (
    <>
      {detailIsLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="container mx-auto padding-top">
            <div className="grid grid-cols-1 xl:grid-cols-2 m-6">
              {JSON.stringify(detail.Picture) === '{}' ||
              !detail.Picture.hasOwnProperty('PictureUrl1') ? (
                <div className="w-full h-96 bg-secondary rounded-xl shadow-xl overflow-hidden flex justify-center items-center">
                  <div className="text-secondary">
                    <AiOutlinePicture className="text-7xl mx-auto" />
                    <p>此景點未提供照片</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-96 bg-secondary  rounded-xl shadow-xl overflow-hidden">
                  <img
                    src={detail.Picture.PictureUrl1}
                    className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                  />
                </div>
              )}
              <div className="xl:p-md md:py-md xl:ml-4 md:mt-2">
                <h2 className="text-3xl font-bold pb-md">{detail.Name}</h2>
                <h2 className="text-2xl font-bold pb-md">資訊</h2>
                <h3 className="text-lg font-semibold pb-sm">電話：</h3>
                <p className="pb-sm">{detail.Phone}</p>
                <h3 className="text-lg font-semibold pb-sm">地址：</h3>
                <p className="pb-sm">
                  {detail.hasOwnProperty('Address')
                    ? detail.Address
                    : '詳見官網'}
                </p>
                <h3 className="text-lg font-semibold pb-sm">開放時間：</h3>
                <p>
                  {detail.hasOwnProperty('OpenTime')
                    ? detail.OpenTime
                    : detail.StartTime.substring(0, 10)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-secondary ">
            <div className="container mx-auto ">
              <div className="m-6 lg:px-0 md:px-xl">
                <h2 className="text-2xl font-bold py-md">介紹</h2>
                <p>{detail.Description}</p>
                <h2 className="text-2xl font-bold py-md">景點地圖</h2>
                <MapContainer
                  center={[
                    `${detail.Position.PositionLat}`,
                    `${detail.Position.PositionLon}`,
                  ]}
                  zoom={13}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[
                      `${detail.Position.PositionLat}`,
                      `${detail.Position.PositionLon}`,
                    ]}
                  >
                    <Popup>
                      <h2>{detail.Name}</h2>
                      <p>
                        {detail.hasOwnProperty('Address')
                          ? detail.Address
                          : '詳見官網'}
                      </p>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
