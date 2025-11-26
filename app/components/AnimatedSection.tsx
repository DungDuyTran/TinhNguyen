// components/AnimatedSection.tsx
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

// --- (Không bắt buộc) Khai báo kiểu cho component ---
interface AnimatedSectionProps {
  title: string;
  description: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  title,
  description,
}) => {
  // 1. Quản lý Refs
  // Ref cho toàn bộ phạm vi (scope) của GSAP Context
  const scopeRef = useRef<HTMLDivElement>(null);

  // Refs cho các phần tử mục tiêu
  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  // 2. useLayoutEffect & GSAP Context
  useLayoutEffect(() => {
    // Khởi tạo GSAP Context, gắn nó vào scopeRef
    let ctx = gsap.context(() => {
      // Tạo một Timeline để quản lý chuỗi animation
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" },
      });

      // BƯỚC 1: Animation cho Header
      tl.from(headerRef.current, {
        opacity: 0,
        y: 30, // Trượt từ dưới lên
        scale: 0.95,
      });

      // BƯỚC 2: Animation cho Paragraph, bắt đầu sớm hơn BƯỚC 1 kết thúc 0.4s
      tl.from(
        paragraphRef.current,
        {
          opacity: 0,
          x: -20, // Trượt từ trái sang
          delay: 0.1, // Thêm độ trễ nhỏ sau Header
        },
        "<0.4"
      ); // Lệnh "<0.4" cho biết animation này bắt đầu 0.4 giây trước khi animation trước đó (header) kết thúc.

      // *Tất cả các lệnh gsap.to/from/timeline bên trong đây đều được Context quản lý.*
    }, scopeRef); // Gắn Context vào Ref

    // 3. Cleanup: Tự động kill/revert tất cả animation trong Context khi component unmount
    return () => ctx.revert();
  }, []); // Dependencies rỗng: Chạy 1 lần khi component mount

  return (
    <div
      ref={scopeRef} // Gắn scope Ref vào container ngoài cùng
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "50px auto",
        border: "1px solid #ddd",
      }}
    >
      <h1 ref={headerRef} style={{ color: "#0070f3" }}>
        {title}
      </h1>
      <p ref={paragraphRef} style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
        {description}
      </p>
    </div>
  );
};

export default AnimatedSection;
