import React from 'react';
import museum from '../images/museum.png';
import map from '../images/map.png';

function Detail() {
  return (
    <>
      <div className="container mx-auto padding-top">
        <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 py-lg">
          <div>
            <img src={museum} />
          </div>
          <div className="p-md">
            <h2 className="text-3xl font-bold pb-md">台北市立美術館</h2>
            <h2 className="text-2xl font-bold pb-md">資訊</h2>
            <h3 className="text-lg font-semibold pb-sm">電話：</h3>
            <p className="pb-sm">02-2342345</p>
            <h3 className="text-lg font-semibold pb-sm">地址：</h3>
            <p className="pb-sm">臺北市中山區中山北路三段181號</p>
            <h3 className="text-lg font-semibold pb-sm">開放時間：</h3>
            <p>
              週一 休館週二至週日 9:30-17:30週六 9:30-20:30週六17:00後免票參觀
            </p>
          </div>
        </div>
      </div>
      <div className="bg-secondary">
        <div className="container mx-auto pb-lg">
          <h2 className="text-2xl font-bold pb-md">介紹</h2>
          <p>
            1983年開館，是臺灣首座現代美術館，空間與展品的規劃新潮活潑，結合民眾生活與美術賞析。館內空間包含地下1層及地面3層，地下樓主要提供年輕藝術家及團體展、競賽展，附設圖書及餐飲等服務。1樓除了入口大廳，展覽室6公尺高的大型牆面及3層樓挑高的寬敞空間，主要用於國內外重要大型展覽；2樓常設展區依照美術史架構或主題，展出各項館藏。3樓明亮的採光與雙十字型交錯空間則以主題展覽為主。建築物由高而潘建築師所設計。除了展覽，館方不定期舉辦研討及假日親子活動，製造美術館與民眾互動的機會，更拉近藝術與生活的距離。現更推出週六夜間開館，為營造夜間時段濃厚的藝術氣氛，美術館也特別增加館體及戶外雕塑照明，廣場上的大型青銅雕塑「朱銘－太極拱門」和紅色不鏽鋼「李再鈐－紅不讓」都成為中山北路夜間的美麗視覺焦點。
          </p>
          <h2 className="text-2xl font-bold py-md">景點地圖</h2>
          <img src={map} />
        </div>
      </div>
    </>
  );
}

export default Detail;
