// import * as MediaLibrary from "expo-media-library";

// nhạc test
export const songData = [
  {
    id: 0,
    name: "A little love",
    singer: "Fiona Fung",
    uri: require("../assets/song/song0.mp3"),
  },
  {
    id: 1,
    name: "Ánh nắng của anh",
    singer: "Đức Phúc",
    uri: require("../assets/song/song1.mp3"),
  },
  {
    id: 2,
    name: "Bước qua mùa cô đơn",
    singer: "Vũ",
    uri: require("../assets/song/song2.mp3"),
  },
  {
    id: 3,
    name: "Có em",
    singer: "Madihu",
    uri: require("../assets/song/song3.mp3"),
  },
  {
    id: 4,
    name: "The simple things",
    singer: "Michael Carreon",
    uri: require("../assets/song/song4.mp3"),
  },
  {
    id: 5,
    name: "Lời đường mật",
    singer: "HIEUTHUHAI, Lyly",
    uri: require("../assets/song/song5.mp3"),
  },
  {
    id: 6,
    name: "Đã lỡ yêu em nhiều",
    singer: "Justatee",
    uri: require("../assets/song/song6.mp3"),
  },
  {
    id: 7,
    name: "Hai mươi hai",
    singer: "Amee",
    uri: require("../assets/song/song7.mp3"),
  },
  {
    id: 8,
    name: "Mặt trời của em",
    singer: "Phương Ly",
    uri: require("../assets/song/song8.mp3"),
  },
  {
    id: 9,
    name: "Thích thích",
    singer: "Phương Ly",
    uri: require("../assets/song/song9.mp3"),
  },
  {
    id: 10,
    name: "As long as you love me",
    singer: "Justin Bieber",
    uri: require("../assets/song/song10.mp3"),
  },
  {
    id: 11,
    name: "Gangnam Style",
    singer: "PSY",
    uri: require("../assets/song/song11.mp3"),
  },
  {
    id: 12,
    name: "Havana",
    singer: "Camila Cabello",
    uri: require("../assets/song/song12.mp3"),
  },
  {
    id: 13,
    name: "Kill this love",
    singer: "Black Pink",
    uri: require("../assets/song/song13.mp3"),
  },
  {
    id: 14,
    name: "Waiting for you",
    singer: "MONO",
    uri: require("../assets/song/song14.mp3"),
  },
  {
    id: 15,
    name: "Wavin flag",
    singer: "Knaan",
    uri: require("../assets/song/song15.mp3"),
  },
  {
    id: 16,
    name: "We don't talk anymore",
    singer: "Charlie Puth",
    uri: require("../assets/song/song16.mp3"),
  },
  {
    id: 17,
    name: "Cứ chill thôi",
    singer: "Chillies",
    uri: require("../assets/song/song17.mp3"),
  },
  {
    id: 18,
    name: "Head in the clouds",
    singer: "Hayd",
    uri: require("../assets/song/song18.mp3"),
  },
  {
    id: 19,
    name: "Là em",
    singer: "Thái Đinh",
    uri: require("../assets/song/song19.mp3"),
  },
  {
    id: 20,
    name: "Lạ lùng",
    singer: "Vũ",
    uri: require("../assets/song/song20.mp3"),
  },
  {
    id: 21,
    name: "At my worst",
    singer: "Pink Sweat",
    uri: require("../assets/song/song21.mp3"),
  },
  {
    id: 22,
    name: "Mặt mộc",
    singer: "Phạm Nguyên Ngọc, Vanh",
    uri: require("../assets/song/song22.mp3"),
  },
  {
    id: 23,
    name: "Nơi này có anh",
    singer: "Sơn Tùng MTP",
    uri: require("../assets/song/song23.mp3"),
  },
  {
    id: 24,
    name: "Perfect",
    singer: "Ed Sheeran",
    uri: require("../assets/song/song24.mp3"),
  },
  {
    id: 25,
    name: "Until You",
    singer: "Shayne Ward",
    uri: require("../assets/song/song25.mp3"),
  },
  {
    id: 26,
    name: "Cafe và những ngày vui",
    singer: "Thế Bảo",
    uri: require("../assets/song/song26.mp3"),
  },
  {
    id: 27,
    name: "Thằng điên",
    singer: "Justatee",
    uri: require("../assets/song/song27.mp3"),
  },
  {
    id: 28,
    name: "Bài này chill phết",
    singer: "Đen, Min",
    uri: require("../assets/song/song28.mp3"),
  },
  {
    id: 29,
    name: "Cho mình em",
    singer: "Binz",
    uri: require("../assets/song/song29.mp3"),
  },
  {
    id: 30,
    name: "Đưa nhau đi trốn",
    singer: "Đen",
    uri: require("../assets/song/song30.mp3"),
  },
  {
    id: 31,
    name: "Một người vì em",
    singer: "WEAN",
    uri: require("../assets/song/song31.mp3"),
  },
  {
    id: 32,
    name: "Sao cũng được",
    singer: "Binz",
    uri: require("../assets/song/song32.mp3"),
  },
  {
    id: 33,
    name: "Trốn tìm",
    singer: "Binz",
    uri: require("../assets/song/song33.mp3"),
  },
  {
    id: 34,
    name: "Nghe như tình yêu",
    singer: "HIEUTHUHAI",
    uri: require("../assets/song/song34.mp3"),
  },
];

// export async function getAllAudioFilesFromDevice() {
//   try {
//     // Yêu cầu quyền truy cập thư viện phương tiện
//     const { status } = await MediaLibrary.requestPermissionsAsync();
//     if (status !== "granted") {
//       throw new Error("Permission not granted for media library");
//     }

//     // Lấy danh sách tất cả các tệp âm thanh
//     const media = await MediaLibrary.getAssetsAsync({ mediaType: "audio" });

//     // Lấy URI của các tệp âm thanh
//     const uris = media.assets.map((asset, index) => ({
//       id: songData.length + parseInt(index),
//       name: asset.filename,
//       singer: "Unknown",
//       uri: asset.uri,
//     }));

//     // const uris = media.assets
//     return uris;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }
