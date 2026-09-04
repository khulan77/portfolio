export type ProcessStep = {
  index: string;
  title: string;
  body: string;
};

export const process: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    body: "Асуудлыг өөрийг нь ойлгоно. Хэн зовж байна, одоо яаж шийдэж байна, юу нь ажиллахгүй байна вэ.",
  },
  {
    index: "02",
    title: "Strategize",
    body: "Бүтээгдэхүүний хамрах хүрээг тодорхойлно. Юуг заавал хийх, юуг огт хийхгүй вэ гэдгийг эхэнд шийднэ.",
  },
  {
    index: "03",
    title: "Design",
    body: "Хэрэглэгчийн урсгал, мэдээллийн бүтэц, интерфейсийг зурна. Дизайн нь чимэглэл биш, шийдлийн хэлбэр.",
  },
  {
    index: "04",
    title: "Build",
    body: "Frontend, API, өгөгдлийн сан, AI давхаргыг нэг бүтэн систем болгож хөгжүүлнэ.",
  },
  {
    index: "05",
    title: "Ship",
    body: "Production-д гаргаж, ажиллагааг нь хэмжиж, засаж сайжруулна. Deploy бол төгсгөл биш, эхлэл.",
  },
];
