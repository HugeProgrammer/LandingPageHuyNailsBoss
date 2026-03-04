import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, CheckCircle, Star, User, Zap, X, ArrowRight } from 'lucide-react';


export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State quản lý dữ liệu form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  
  // State quản lý trạng thái gửi (đang gửi, thành công, lỗi)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // ĐIỀN LINK WEB APP URL CỦA GOOGLE APPS SCRIPT VÀO ĐÂY
  const SCRIPT_URL = "DÁN_LINK_GOOGLE_SCRIPT_CỦA_BẠN_VÀO_ĐÂY";
  const [timeLeft, setTimeLeft] = useState(3600); 
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return { h, m, s };
  };

  const { h, m, s } = formatTime(timeLeft);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const scrollToRegister = () => {
    document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate cơ bản
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setStatus('submitting');

    // Chuyển data thành định dạng Form Data để gửi đi
    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('email', formData.email);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbyaW8uXqQSwRevq_RP_JPMrx2FDViXa7dMljsjcI9E_Hb6s4x_PyJzCOO40BL21qyMO/exec", {
        method: 'POST',
        mode: 'no-cors',
        body: data
      });
      
      setStatus('success');
      // Xóa trắng form sau khi gửi thành công
      setFormData({ name: '', phone: '', email: '' });
      
      // Tùy chọn: Ẩn thông báo thành công sau 5 giây
      setTimeout(() => setStatus('idle'), 5000);
      
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-vibrant-pink selection:text-white overflow-x-hidden">
      {/* Navigation (Giữ nguyên) */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-vibrant-pink flex items-center justify-center shadow-lg shadow-pink-500/20">
                <Zap className="text-white" size={24} />
              </div>
              <span className="font-serif text-2xl font-bold text-vibrant-pink">Nail Boss AI</span>
            </div>
            <button
              onClick={scrollToRegister}
              className="hidden md:flex items-center gap-2 bg-vibrant-pink text-white font-bold py-2.5 px-8 rounded-full hover:bg-vibrant-pink/90 transition-all transform hover:scale-105 shadow-md"
            >
              Đăng Ký Ngay <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section (Giữ nguyên) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-vibrant-pink/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-rose-gold/10 rounded-full blur-[150px]" />
          <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-lavender/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-vibrant-pink/10 border border-vibrant-pink/30 text-soft-pink text-sm font-semibold tracking-wider mb-6 shadow-[0_0_15px_rgba(255,0,127,0.2)]">
              ZOOM MIỄN PHÍ ĐẦU NĂM 2026
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold leading-tight mb-6 text-black">
              BÍ QUYẾT <span className="text-vibrant-pink">TƯ DUY CHỦ TIỆM</span> <br />
              & ỨNG DỤNG AI 2026
            </h1>
            <p className="text-gray-700 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              Khởi động 2026 với chiến lược vận hành tiệm Nail bài bản, tự động hóa bằng AI.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-20">
              <button
                onClick={scrollToRegister}
                className="w-full sm:w-auto bg-vibrant-pink text-white font-bold text-xl py-5 px-12 rounded-full hover:bg-vibrant-pink/90 transition-all transform hover:scale-105 shadow-xl"
              >
                Đăng Ký Tham Gia Miễn Phí
              </button>
              <button
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-black text-white font-semibold text-xl py-5 px-12 rounded-full hover:bg-black/90 transition-all shadow-lg"
              >
                Tìm Hiểu Thêm
              </button>
            </div>

            {/* Speakers Preview */}
            <div className="flex justify-center items-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-vibrant-pink p-1 mx-auto mb-3">
                  <img 
                    src="/images/huygemini.png" 
                    alt="Huy Nails Boss" 
                    className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-black">Huy Nails Boss</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Chuyên gia Setup & Vận hành Tiệm Nail</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-vibrant-pink p-1 mx-auto mb-3">
                  <img 
                    src="/images/leader.jpg" 
                    alt="Quốc Nguyễn" 
                    className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-black">Quốc Nguyễn</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Chuyên gia AI Marketing</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section (Giữ nguyên) */}
      <section id="details" className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              VẤN ĐỀ BẠN ĐANG GẶP PHẢI<br />
                <span className="text-gradient-vibrant">Hệ thống tiệm của bạn có đang mắc kẹt trong những rào cản này?</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Vị trí kinh doanh bất lợi: Tiệm khuất tầm nhìn, bãi đậu xe hẹp, vắng khách vãng lai.",
                  "Tiếp thị kém hiệu quả: Trả nhiều tiền cho Agency, chạy quảng cáo không hiệu quả, không đo lường được tỷ lệ chuyển đổi (ROI).",
                  "Cuộc chiến phá giá (Price War): Buộc phải giảm giá liên tục để cạnh tranh, làm mất giá trị thương hiệu và biên độ lợi nhuận.",
                  "Khó giữ chân khách hàng: Thiếu hệ thống chăm sóc tự động khiến khách hàng chỉ đến một lần rồi rời đi.",
                  "Nghịch lý trong kinh doanh: Lợi nhuận thực tế thu về đôi khi còn thấp hơn lương của thợ.",
                  "Mất thợ giỏi vì chia turn cảm tính: Nội bộ tị nạnh, thiếu minh bạch khiến thợ cứng bất mãn, dễ chảy máu nhân sự sang đối thủ."
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-vibrant-pink/30 transition-colors shadow-sm"
                  >
                    <div className="mt-1 min-w-[24px]">
                      <X className="text-red-500" />
                    </div>
                    <p className="text-gray-700 text-lg">{item}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-vibrant-pink/5 border-l-4 border-vibrant-pink rounded-r-xl">
                <p className="text-xl font-serif italic text-vibrant-pink font-bold">
                  "👉 Buổi Zoom này dành riêng cho bạn."
                </p>
              </div>
              <div className="flex justify-center md:justify-start">
                <button
                  onClick={scrollToRegister}
                  className=" mt-8 w-full sm:w-auto bg-vibrant-pink text-white font-bold text-lg py-4 px-10 rounded-full hover:bg-vibrant-pink/90 transition-all transform hover:scale-105 shadow-lg"
                >
                  Đăng Ký Tham Gia Miễn Phí
                </button>
              </div>
            </div>
            <div className="relative h-[800px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
               <img 
                 src="/images/nails.png" 
                 alt="Nail Salon Struggle" 
                 className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-gold/5 rounded-full blur-[150px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-1 gap-12 items-center">
            <div className="text-center">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12 text-gray-900">
                KHÓA HỌC NÀY <span className="text-gradient-vibrant">DÀNH CHO AI?</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Chủ tiệm Nail/Spa",
                    desc: "Đang tìm kiếm chiến lược tăng doanh thu, thoát khỏi việc cạnh tranh bằng giá.",
                    gradient: "from-vibrant-pink/10 to-transparent"
                  },
                  {
                    title: "Nhà đầu tư chuẩn bị mở tiệm",
                    desc: "Cần kiến thức đánh giá mặt bằng (Location), phân tích tệp khách hàng trước khi xuống tiền.",
                    gradient: "from-gray-100 to-transparent"
                  },
                  {
                    title: "Quản lý (Manager)",
                    desc: "Mong muốn áp dụng phần mềm và trí tuệ nhân tạo (A.I) để tự động hóa quy trình vận hành.",
                    gradient: "from-vibrant-pink/10 to-transparent"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    /* Thêm dòng whileHover dưới đây để thẻ nhảy lên 15px */
                    whileHover={{ y: -15 }} 
                    /* Thêm duration-300 và hover:shadow-2xl để hiệu ứng mượt và có bóng đổ đẹp hơn */
                    className={`p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-vibrant-pink transition-all duration-300 text-left relative overflow-hidden group shadow-md hover:shadow-2xl`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-vibrant-pink/10 flex items-center justify-center text-vibrant-pink mb-6">
                        <CheckCircle size={28} />
                      </div>
                      <h3 className="font-serif text-2xl font-bold mb-4 text-black">{item.title}</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={scrollToRegister}
                  className=" mt-16 w-full sm:w-auto bg-vibrant-pink text-white font-bold text-lg py-5 px-14 rounded-full hover:bg-vibrant-pink/90 transition-all transform hover:scale-105 shadow-xl"
                >
                  Đăng Ký Tham Gia Miễn Phí
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden bg-gray-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-vibrant-pink/5 blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-serif text-3xl md:text-6xl font-bold mb-6 text-gray-900">Nội Dung <span className="text-gradient-vibrant">Chia Sẻ Độc Quyền</span></h2>
            <div className="w-24 h-1 bg-gradient-vibrant mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <User size={32} />,
                title: "Tối ưu Trải nghiệm Khách hàng",
                desc: "Làm chủ 3 điểm chạm: Nắm bắt tâm lý khách Trước, Trong và Sau dịch vụ. Cá nhân hóa không gian: Thiết kế âm nhạc, mùi hương chuẩn gu.",
                color: "text-vibrant-pink"
              },
              {
                icon: <Zap size={32} />,
                title: "Chiến lược Marketing Thực chiến",
                desc: "Tối ưu lợi nhuận: Công thức biến $170 tiền quảng cáo thành $1,700 doanh thu. Kéo khách VIP: Bí quyết liên kết chéo với đối tác lân cận.",
                color: "text-black"
              },
              {
                icon: <Star size={32} />,
                title: "Quản lý POS & Tự động hóa",
                desc: "Tiếp tân AI: Hệ thống POS tự động nghe điện thoại. Lọc Data khách hàng: Tự động phân loại khách VIP. SMS Remarketing hiệu quả.",
                color: "text-vibrant-pink"
              },
              {
                icon: <CheckCircle size={32} />,
                title: "Ứng dụng AI siêu tốc",
                desc: "Content tự động: AI tự lên kịch bản đăng bài suốt 30 ngày. Thiết kế trong 5 giây: Tự làm Poster, Menu theo mùa lễ hội.",
                color: "text-black"
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -12 }}
                className="p-10 rounded-3xl bg-white border-2 border-gray-100 hover:border-vibrant-pink transition-all group shadow-md"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center ${feature.color} mb-8 group-hover:bg-vibrant-pink group-hover:text-white transition-all duration-500 shadow-sm`}>
                  {feature.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4 text-black leading-tight">{feature.title}</h3>
                <p className="text-gray-700 text-base leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 sm:flex-row items-center justify-center gap-6 flex">
              <button
                onClick={scrollToRegister}
                className="w-full sm:w-auto bg-vibrant-pink text-white font-bold text-xl py-5 px-14 rounded-full hover:bg-vibrant-pink/90 transition-all transform hover:scale-105 shadow-xl"
              >
                Giữ chỗ trong lớp zoom sắp tới
              </button>
          </div>
          {/* Special Guest */}
          <div className="mt-24 p-10 md:p-16 rounded-[40px] bg-white border-2 border-vibrant-pink relative overflow-hidden group shadow-2xl">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Star size={300} className="text-vibrant-pink" />
             </div>
             <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
               <div className="w-40 h-40 md:w-64 md:h-64 rounded-3xl border-4 border-black overflow-hidden shrink-0 shadow-[0_0_40px_rgba(0,0,0,0.1)] rotate-3 group-hover:rotate-0 transition-transform duration-500">
                 <img src="/images/huygemini.png" alt="Huy Nails Boss" className="w-full h-full object-cover" />
               </div>
               <div className="text-center md:text-left">
                 <div className="inline-block px-5 py-1.5 rounded-full bg-black text-white text-xs font-bold mb-6 shadow-lg">FOUNDER NAILS BOSS</div>
                 <h3 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-black">HUY NAILS BOSS</h3>
                 <p className="text-gray-700 text-xl leading-relaxed font-medium">
                 Sở hữu hơn 10 năm kinh nghiệm thực chiến dày dặn trong việc tư vấn vận hành và tối ưu hóa hệ thống tiệm Nails. Đang vận hành song song 5 tiệm Nails tại Mỹ. Nội dung chia sẻ dựa hoàn toàn trên dữ liệu thực tế: từ việc đánh giá mặt bằng, thiết kế trải nghiệm dịch vụ đến tối ưu dòng tiền quảng cáo.
                 </p>
               </div>
             </div>
          </div>
          {/* Huy */}
          <div className="mt-12 p-10 md:p-16 rounded-[40px] bg-white border-2 border-black relative overflow-hidden group shadow-2xl">
             <div className="absolute bottom-0 left-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Zap size={300} className="text-black" />
             </div>
             <div className="flex flex-col md:flex-row-reverse items-center gap-12 relative z-10">
               <div className="w-40 h-40 md:w-64 md:h-64 rounded-3xl border-4 border-vibrant-pink overflow-hidden shrink-0 shadow-[0_0_40px_rgba(255,0,127,0.1)] -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                 <img src="/images/leader.jpg" alt="Quốc Nguyễn" className="w-full h-full object-cover" />
               </div>
               <div className="text-center md:text-left">
                 <div className="inline-block px-5 py-1.5 rounded-full bg-vibrant-pink text-white text-xs font-bold mb-6 shadow-lg">KHÁCH MỜI ĐẶC BIỆT</div>
                 <h3 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-black">QUỐC NGUYỄN</h3>
                 <p className="text-gray-700 text-xl leading-relaxed font-medium">
                 Nhà phát triển hệ thống công cụ AI thiết kế chuyên biệt cho ngành Nails. Anh sẽ trực tiếp hướng dẫn cách giải phóng chủ tiệm khỏi việc phụ thuộc Agency, tối ưu hóa toàn bộ ấn phẩm Marketing hoàn toàn bằng AI.
                 </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Time & Date (Giữ nguyên) */}
      <section className="py-24 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vibrant-pink/5 rounded-full blur-[150px]" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-16 text-gray-900">Thời Gian Diễn Ra Sự Kiện</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-16">
            <div className="bg-white p-10 rounded-[32px] border border-vibrant-pink/20 w-full md:w-auto min-w-[300px] shadow-xl">
              <Calendar className="w-16 h-16 text-vibrant-pink mx-auto mb-6" />
              <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Thứ Tư</p>
              <p className=" text-4xl font-bold text-gray-900 mt-3">03/04/2026</p>
            </div>
            
            <div className="hidden md:block h-px w-24 bg-vibrant-pink"></div>
            
            <div className="space-y-6 text-left w-full md:w-auto">
              {[
                { time: "8:00 PM", zone: "Central Time (Texas)", color: "border-vibrant-pink/30" },
                { time: "7:00 PM", zone: "New York", color: "border-black/20" },
                { time: "6:00 PM", zone: "California", color: "border-vibrant-pink/30" },
              ].map((slot, idx) => (
                <div key={idx} className={`flex items-center gap-6 p-5 rounded-2xl bg-white border ${slot.color} hover:scale-105 transition-transform cursor-default shadow-sm`}>
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-vibrant-pink">
                    <Clock size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-2xl text-gray-900">{slot.time}</span>
                    <span className="text-sm text-gray-500 font-medium">{slot.zone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form (Đã cập nhật logic Submit) */}
      <section id="register-form" className="py-24 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-vibrant-pink/5 to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-[48px] p-10 md:p-16 border-2 border-vibrant-pink shadow-[0_0_80px_rgba(255,0,127,0.1)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-vibrant-pink"></div>
            
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-black">Đăng Ký Giữ Chỗ Ngay</h2>
              <p className="text-gray-700 mb-10 text-lg font-medium">
                Zoom hoàn toàn <span className="text-vibrant-pink font-bold">FREE</span>. Chỉ mở <span className="text-vibrant-pink font-bold underline decoration-2 underline-offset-4"> 50 suất </span>cho người đăng ký sớm nhất.
              </p>

              {/* Phần Đồng Hồ Đếm Ngược */}
              <div className="flex justify-center items-center gap-4 sm:gap-6 mt-8">
                {/* Giờ */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-50 border border-vibrant-pink/30 shadow-[0_0_20px_rgba(255,0,127,0.1)] text-vibrant-pink font-bold text-4xl sm:text-5xl py-4 px-5 rounded-2xl w-20 sm:w-24 text-center">
                    {h}
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm mt-3 font-bold uppercase tracking-widest">Giờ</span>
                </div>

                <div className="text-vibrant-pink text-4xl sm:text-5xl font-bold pb-10 animate-pulse">:</div>

                {/* Phút */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-50 border border-vibrant-pink/30 shadow-[0_0_20px_rgba(255,0,127,0.1)] text-vibrant-pink font-bold text-4xl sm:text-5xl py-4 px-5 rounded-2xl w-20 sm:w-24 text-center">
                    {m}
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm mt-3 font-bold uppercase tracking-widest">Phút</span>
                </div>

                <div className="text-vibrant-pink text-4xl sm:text-5xl font-bold pb-10 animate-pulse">:</div>

                {/* Giây */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-50 border border-vibrant-pink/30 shadow-[0_0_20px_rgba(255,0,127,0.1)] text-vibrant-pink font-bold text-4xl sm:text-5xl py-4 px-5 rounded-2xl w-20 sm:w-24 text-center">
                    {s}
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm mt-3 font-bold uppercase tracking-widest">Giây</span>
                </div>
              </div>
            </div>

            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/50 rounded-3xl p-12 text-center text-green-400 shadow-2xl"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Đăng Ký Thành Công!</h3>
                <p className="text-lg">Cảm ơn bạn. Thông tin Zoom sẽ được gửi qua Email/Zalo của bạn sớm nhất.</p>
              </motion.div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="group">
                  <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider group-focus-within:text-vibrant-pink transition-colors">Họ và Tên</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-vibrant-pink focus:ring-2 focus:ring-vibrant-pink/20 transition-all text-lg placeholder:text-gray-400"
                    placeholder="Nhập tên của bạn"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider group-focus-within:text-vibrant-pink transition-colors">Số Điện Thoại (Zalo)</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-vibrant-pink focus:ring-2 focus:ring-vibrant-pink/20 transition-all text-lg placeholder:text-gray-400"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider group-focus-within:text-vibrant-pink transition-colors">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-vibrant-pink focus:ring-2 focus:ring-vibrant-pink/20 transition-all text-lg placeholder:text-gray-400"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="text-red-500 text-lg text-center font-medium bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                    Có lỗi xảy ra khi gửi dữ liệu. Vui lòng thử lại!
                  </div>
                )}

                <div className="pt-6">
                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`w-full bg-vibrant-pink text-white font-bold text-2xl py-5 rounded-2xl transition-all transform hover:scale-[1.02] shadow-xl ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-vibrant-pink/90 hover:shadow-[0_0_40px_rgba(255,0,127,0.5)]'}`}
                  >
                    {status === 'submitting' ? 'ĐANG GỬI...' : 'XÁC NHẬN THAM GIA'}
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-6 italic">
                    *Thông tin của bạn được bảo mật tuyệt đối. Chúng tôi sẽ gửi link Zoom qua Email/Zalo.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10 text-center">
        <p className="text-white text-sm font-bold tracking-widest">
          © 2026 Nail Boss AI. All rights reserved. <br />
          <span className="text-vibrant-pink">Designed for Success.</span>
        </p>
      </footer>
    </div>
  );
}