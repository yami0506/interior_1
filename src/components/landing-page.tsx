"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ThreeScene from "./three-scene";
import { Button } from "./ui/button";
import Navbar from "./ui/navbar";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end start"],
  });

  // スクロール位置の監視
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // スクロール位置に応じて変化する値
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  // 現在表示している部屋のインデックス（スクロールに基づく）
  const roomIndex = Math.min(Math.floor(scrollY / 800), 3);

  // 各部屋のスタイル
  const roomStyles = [
    { bgColor: "from-black to-zinc-900", accentColor: "text-[#9e8c57]" },
    { bgColor: "from-zinc-900 to-indigo-950", accentColor: "text-[#a4b9c3]" },
    { bgColor: "from-indigo-950 to-slate-900", accentColor: "text-[#6f9f90]" },
    { bgColor: "from-slate-900 to-zinc-900", accentColor: "text-[#b6abae]" }
  ];

  // キャッチコピーの配列
  const catchphrases = [
    "未来のインテリアを、今、あなたの手のひらに。",
    "美の革新、空間の変容。",
    "エレガンスと革新が交差する、あなたの夢の空間。",
    "感じる、変わる、未来のインテリア。"
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* ナビゲーションバー */}
      <Navbar />

      {/* 3Dシーンをバックグラウンドとして配置 */}
      <ThreeScene scrollY={scrollY} />

      {/* フルスクリーンのヒーローセクション */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-b ${roomStyles[roomIndex].bgColor} opacity-70 transition-colors duration-700`}
        />

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          style={{ opacity, scale, y }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-4xl md:text-7xl font-bold mb-6 ${roomStyles[roomIndex].accentColor} leading-tight`}
          >
            {catchphrases[roomIndex]}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
          >
            革新的なインテリアデザインで、あなたの生活空間を未来へと導きます。
            光と影、質感と色彩、テクノロジーと自然の融合が作り出す、新しい暮らしの形を体験してください。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="default"
              size="lg"
              className="bg-white text-black hover:bg-white/90 text-lg rounded-full px-8"
            >
              コレクションを見る
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 text-lg rounded-full px-8"
            >
              詳細を探る
            </Button>
          </motion.div>
        </motion.div>

        {/* スクロールダウン指示 */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="mb-2 text-sm">スクロールして探索する</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </motion.div>
      </section>

      {/* インテリアアートショーケース */}
      <section id="コレクション" className="min-h-screen w-full py-20 px-4 relative">
        <div className={`absolute inset-0 bg-gradient-to-b from-zinc-900 to-black opacity-90`} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold mb-12 text-center text-white"
          >
            Interior Art Showcase
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: item * 0.1 }}
                className="group relative"
              >
                <div className="aspect-square overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm hover:bg-zinc-800/70 transition-all duration-300 border border-white/5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-amber-300 to-amber-600 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
                  </div>
                  <div className="relative h-full w-full p-6 flex flex-col items-center justify-center">
                    <div className="h-24 w-24 rounded-md bg-white/10 mb-6 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-medium text-white mb-2">{`未来の家具 ${item}`}</h3>
                    <p className="text-sm text-white/70 text-center">
                      革新的なデザインと機能性を兼ね備えた、次世代の家具コレクション
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 非現実的な幻想空間 */}
      <section id="ショーケース" className="min-h-screen w-full py-20 px-4 relative">
        <div className={`absolute inset-0 bg-gradient-to-b from-black to-indigo-950 opacity-90`} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold mb-12 text-center text-white"
          >
            Surreal Spaces
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-10 border border-white/10"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">重力を超えた空間</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                従来の物理法則にとらわれない、未来的なインテリア空間。
                浮遊する家具、流れるような床、そして壁面に変形するアートが、五感を刺激する新たな体験を提供します。
              </p>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-white/5">
                <div className="relative h-32 w-32">
                  <div className="absolute top-0 left-0 h-16 w-16 bg-white/20 rounded-lg animate-float" />
                  <div className="absolute bottom-0 right-0 h-16 w-16 bg-white/20 rounded-lg animate-float-delayed" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-10 border border-white/10"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">変形する環境</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                スクロールやクリックに応じて形状を変える、インタラクティブな空間。
                壁が波打ち、天井が呼吸するような動きを見せ、訪れるたびに新しい発見のある空間を体験できます。
              </p>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center border border-white/5">
                <div className="h-40 w-40 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* インタラクティブショールーム */}
      <section id="体験" className="min-h-screen w-full py-20 px-4 relative">
        <div className={`absolute inset-0 bg-gradient-to-b from-indigo-950 to-slate-900 opacity-90`} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold mb-12 text-center text-white"
          >
            Interactive Showroom
          </motion.h2>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-10 mb-12 border border-white/10">
            <div className="flex flex-col lg:flex-row gap-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">空間をカスタマイズ</h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  インタラクティブなシミュレーションで、あなた自身の理想の空間を作り上げることができます。
                  カラーパレット、テクスチャー、照明効果を調整して、自分だけの空間を探索しましょう。
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {['#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280'].map((color) => (
                    <div
                      key={color}
                      className="h-8 w-8 rounded-full cursor-pointer hover:scale-110 transition-transform border border-white/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 rounded-full"
                >
                  壁の色を変更
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1"
              >
                <div className="aspect-square bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg flex items-center justify-center border border-white/10">
                  <div className="w-2/3 h-2/3 bg-white/5 rounded-lg relative overflow-hidden p-4 border border-white/5">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-500/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-500/30 to-transparent" />
                    </div>
                    <div className="relative h-full flex flex-col items-center justify-center">
                      <div className="h-16 w-40 bg-white/10 rounded-sm mb-4" />
                      <div className="h-8 w-24 bg-white/10 rounded-sm" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Button
              variant="default"
              size="lg"
              className="bg-white text-black hover:bg-white/90 text-lg rounded-full px-8"
            >
              インタラクティブデモを試す
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 未来のインテリアトレンド */}
      <section className="min-h-screen w-full py-20 px-4 relative">
        <div className={`absolute inset-0 bg-gradient-to-b from-slate-900 to-zinc-900 opacity-90`} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold mb-12 text-center text-white"
          >
            Future Interior Trends
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "バイオメトリック家具", desc: "あなたの体に完璧にフィットする、バイオメトリクスを活用した家具デザイン" },
              { title: "インタラクティブ壁面", desc: "空間に合わせて色や質感が変化する、インタラクティブな壁面テクノロジー" },
              { title: "サステナブル素材", desc: "環境への影響を最小限に抑えた、新世代のサステナブル素材を使用した家具" },
              { title: "音響制御空間", desc: "音の反射や吸収を精密に制御し、完璧な音響環境を実現する空間設計" },
              { title: "フレキシブル照明", desc: "時間や活動、気分に合わせて自動調整される次世代の照明システム" },
              { title: "モジュラーインテリア", desc: "用途に応じて自由に組み替えられる、モジュラー構造のインテリアデザイン" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors duration-300 border border-white/10"
              >
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400/30 to-blue-500/30 mb-4 flex items-center justify-center">
                  <span className="text-white text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-white/80 mb-6 max-w-3xl mx-auto leading-relaxed">
              未来のインテリアは、テクノロジーと持続可能性、美しさと機能性が完璧に調和します。
              今すぐ私たちと一緒に、次世代の暮らしを探求してみませんか？
            </p>
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0 text-lg rounded-full px-8"
            >
              未来のデザインを体験する
            </Button>
          </motion.div>
        </div>
      </section>

      {/* フッター */}
      <footer id="コンタクト" className="w-full py-12 px-4 relative bg-zinc-950 border-t border-white/10">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">未来のインテリア</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            美の革新、空間の変容。エレガンスと革新が交差する、あなたの夢の空間。
          </p>
          <div className="flex justify-center gap-4 mb-8">
            {['Twitter', 'Instagram', 'Pinterest', 'YouTube'].map((social) => (
              <Button key={social} variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                {social}
              </Button>
            ))}
          </div>
          <div className="text-white/40 text-sm">
            &copy; 2025 未来のインテリア. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
