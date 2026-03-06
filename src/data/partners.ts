import { StaticImageData } from "next/image";

import autoPt from "@/assest/partners/auto-pt.png";
import calla from "@/assest/partners/calla.jpg";
import cndDesign from "@/assest/partners/cnd-design.png";
import cryptoAvenger from "@/assest/partners/crypto-avenger.png";
import cybercom from "@/assest/partners/cybercom.png";
import dongBek from "@/assest/partners/dong-bek.png";
import emy from "@/assest/partners/emy.png";
import flavors from "@/assest/partners/flavors.png";
import fujuFruit from "@/assest/partners/fuju-fruit.png";
import giaHan from "@/assest/partners/gia-han.png";
import green from "@/assest/partners/green.png";
import haHuyen from "@/assest/partners/ha-huyen.jpg";
import haven from "@/assest/partners/haven.jpg";
import hd from "@/assest/partners/hd.png";
import hnp from "@/assest/partners/hnp.png";
import hoangLong from "@/assest/partners/hoang-long.png";
import ht from "@/assest/partners/ht.png";
import ietSun from "@/assest/partners/iet-sun.png";
import igTour from "@/assest/partners/ig-tour.png";
import interlube from "@/assest/partners/interlube.jpg";
import iocare from "@/assest/partners/iocare.png";
import kallet from "@/assest/partners/kallet.png";
import kuni from "@/assest/partners/kuni.png";
import lavins from "@/assest/partners/lavins.png";
import lk from "@/assest/partners/lk.png";
import miuHomeDesign from "@/assest/partners/miu-home-design.png";
import more from "@/assest/partners/more.png";
import nguNgon from "@/assest/partners/ngu-ngon.png";
import obsess from "@/assest/partners/obsess.png";
import ongTre from "@/assest/partners/ong-tre.png";
import pSafe from "@/assest/partners/p-safe.png";
import phongHien from "@/assest/partners/phong-hien.png";
import pkLtd from "@/assest/partners/pk-ltd.png";
import puCi from "@/assest/partners/pu-ci.png";
import quangLoc from "@/assest/partners/quang-loc.png";
import rauMa from "@/assest/partners/rau-ma.png";
import satMyThuat from "@/assest/partners/satmythuattuanh.png";
import songPhuongTrade from "@/assest/partners/song-phuong-trade.png";
import taurus from "@/assest/partners/taurus.png";
import thaoMocAn from "@/assest/partners/thao-moc-an.png";
import thienHaTravel from "@/assest/partners/thien-ha-travel.png";
import thuyBri from "@/assest/partners/thuy-bri.png";
import ttHaNoi from "@/assest/partners/TT-HA-NOI.png";
import ttSaiGon from "@/assest/partners/TT-SAI-GON.png";
import vcxbcn from "@/assest/partners/VCXBCN.png";
import vietNamStories from "@/assest/partners/viet-nam-stories.png";
import visi from "@/assest/partners/visi.png";

export interface Partner {
  name: string;
  logo: StaticImageData;
}

export const PARTNERS: Partner[] = [
  { name: "Auto PT", logo: autoPt },
  { name: "Calla", logo: calla },
  { name: "CND Design", logo: cndDesign },
  { name: "Crypto Avenger", logo: cryptoAvenger },
  { name: "Cybercom", logo: cybercom },
  { name: "Đông Bắc", logo: dongBek },
  { name: "EMY", logo: emy },
  { name: "Flavors", logo: flavors },
  { name: "Fuju Fruit", logo: fujuFruit },
  { name: "Gia Hân", logo: giaHan },
  { name: "Green", logo: green },
  { name: "Hà Huyền", logo: haHuyen },
  { name: "Haven", logo: haven },
  { name: "HD", logo: hd },
  { name: "HNP", logo: hnp },
  { name: "Hoàng Long", logo: hoangLong },
  { name: "HT", logo: ht },
  { name: "IET Sun", logo: ietSun },
  { name: "IG Tour", logo: igTour },
  { name: "Interlube", logo: interlube },
  { name: "IOCare", logo: iocare },
  { name: "Kallet", logo: kallet },
  { name: "Kuni", logo: kuni },
  { name: "Lavins", logo: lavins },
  { name: "LK", logo: lk },
  { name: "Miu Home Design", logo: miuHomeDesign },
  { name: "More", logo: more },
  { name: "Ngũ Ngon", logo: nguNgon },
  { name: "Obsess", logo: obsess },
  { name: "Ông Tre", logo: ongTre },
  { name: "P-Safe", logo: pSafe },
  { name: "Phong Hiền", logo: phongHien },
  { name: "PK Ltd", logo: pkLtd },
  { name: "Pu Ci", logo: puCi },
  { name: "Quảng Lộc", logo: quangLoc },
  { name: "Rau Má", logo: rauMa },
  { name: "Sắt Mỹ Thuật Tuấn Anh", logo: satMyThuat },
  { name: "Song Phương Trade", logo: songPhuongTrade },
  { name: "Taurus", logo: taurus },
  { name: "Thảo Mộc An", logo: thaoMocAn },
  { name: "Thiên Hà Travel", logo: thienHaTravel },
  { name: "Thủy Bri", logo: thuyBri },
  { name: "TT Hà Nội", logo: ttHaNoi },
  { name: "TT Sài Gòn", logo: ttSaiGon },
  { name: "VCXBCN", logo: vcxbcn },
  { name: "Việt Nam Stories", logo: vietNamStories },
  { name: "Visi", logo: visi },
];
