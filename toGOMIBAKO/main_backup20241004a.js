// PMTilesの、MapLibre GL JS用のプロトコルをグローバルに追加
let protocol = new pmtiles.Protocol();
// addProtocolで、カスタムURLスキーマを使用するときに呼び出される関数を追加する
// pmtiles://~~ が使用されたときに、protocol.tileが呼び出される
maplibregl.addProtocol("pmtiles", protocol.tile);

const map = new maplibregl.Map({
  container: "map",
  center: [139.7024, 35.6598], // 中心座標
  zoom: 1, // ズームレベル
  style: {
    // スタイル仕様のバージョン番号。8を指定する
    version: 8,
    // データソース
    sources: {
      // 背景地図 OpenStreetMapのラスタタイル
      "background-osm-raster": {
        // ソースの種類。vector、raster、raster-dem、geojson、image、video のいずれか
        type: "raster",
        // タイルソースのURL
        tiles: ["https://tile.openstreetmap.jp/styles/osm-bright-ja/{z}/{x}/{y}.png"],
        // タイルの解像度。単位はピクセル、デフォルトは512
        tileSize: 256,
        // データの帰属
        attribution: "<a href='https://www.openstreetmap.org/copyright' target='_blank'>© OpenStreetMap contributors</a>",
      },
      "naturalearth": {
        type: "vector",
        // タイルが利用可能な最小ズームレベル
        minzoom: 0,
        // タイルが利用可能な最大ズームレベル
        maxzoom: 10,
        // リソースへのURL
        url: "pmtiles://http://10.42.0.1/asahina/00_temp/zxy/ne_10m_land_z10.pmtiles",
        attribution: "<a href='https://www.naturalearthdata.com/' target='_blank'>Natual Earth</a>",
      },
    },
    // 表示するレイヤ
    layers: [
      // 背景地図としてOpenStreetMapのラスタタイルを追加
      {
        // 一意のレイヤID
        id: "background-osm-raster",
        // レイヤの種類。background、fill、line、symbol、raster、circle、fill-extrusion、heatmap、hillshade のいずれか
        type: "raster",
        // データソースの指定
        source: "background-osm-raster",
      },
      // Natual Earth 地図データ 間引きなし
      {
        id: "ne_10m_coastline",
        // 塗りつぶされたポリゴン
        type: "fill",
        // ラインとして描画
        //type: "line",
        source: "naturalearth",
        // ベクトルタイルソースから使用するレイヤ
        "source-layer": "ne10m-lnd",
        paint: {
          // 塗りつぶし部分の色
          "fill-color": "rgba(254, 217, 192, 1)",
          // 塗りつぶしの輪郭の色
          "fill-outline-color": "rgba(255, 0, 0, 1)",
          // 塗りつぶしの不透明度 1に近づくほど不透明になる
          "fill-opacity": 0.4,
          //"line-color": "rgba(255, 0, 0, 1)",   // 線の色 (ここでは赤)
          //"line-width": 2,           // 線の太さ (ピクセル単位)
          //"line-opacity": 0.5,       // 線の透明度 (0から1の範囲)
          //"line-dasharray": [2, 4],  // 破線パターン (2ピクセルの線、4ピクセルのスペース)
          //"line-join": "round"       // 線のジョイン (接続部分) の形状 ("miter", "round", "bevel" など)      
        },
      },
    ],
  },
});
