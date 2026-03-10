import type { StaticImageData } from "next/image";

/* ── Local project images ── */
import imgInterlube from "@/assest/projects/screencapture-interlubevn-2025-02-17-02_40_23.png";
import imgIrec from "@/assest/projects/screencapture-irec-vn-2025-02-17-02_48_44.png";
import imgLavins from "@/assest/projects/screencapture-lavins-vn-2025-02-17-02_28_52.png";
import imgLedhoadang from "@/assest/projects/screencapture-ledhoadang-vn-2025-02-17-02_24_27.png";
import imgMaisanvinhouse from "@/assest/projects/screencapture-maisanvinhouse-2025-02-17-02_46_10.png";
import imgMaydaoaethir from "@/assest/projects/screencapture-maydaoaethir-2025-02-17-02_32_29.png";
import imgRubikonline from "@/assest/projects/screencapture-rubikonline-vn-2025-02-17-02_45_29.png";
import imgThehaven from "@/assest/projects/screencapture-thehavenhn-vn-2025-02-17-02_39_06.png";

export interface Project {
  id: number;
  title: string;
  category: string;
  image: StaticImageData;
}

export const PROJECTS: Project[] = [
  { id: 1, title: "Interlube Vietnam",  category: "Công nghiệp", image: imgInterlube },
  { id: 2, title: "IREC Vietnam",       category: "Y tế",        image: imgIrec },
  { id: 3, title: "Lavins",             category: "Làm đẹp",     image: imgLavins },
  { id: 4, title: "LED Hoa Đăng",       category: "Nội thất",    image: imgLedhoadang },
  { id: 5, title: "Mai San Vin House",  category: "Nội thất",    image: imgMaisanvinhouse },
  { id: 6, title: "Máy Đào Aethir",    category: "Công nghiệp", image: imgMaydaoaethir },
  { id: 7, title: "Rubik Online",       category: "Cửa hàng",    image: imgRubikonline },
  { id: 8, title: "The Haven Hà Nội",  category: "Du lịch",     image: imgThehaven },
];

export const CATEGORIES = [
  "Tất cả",
  "Công nghiệp", "Cửa hàng", "Du lịch", "Fnb",
  "Giới thiệu", "Làm đẹp", "Nội thất", "Nông nghiệp",
  "Thời trang", "Thực phẩm", "Trường học", "Xe cộ",
  "Xuất khẩu lao động", "Y tế",
];
