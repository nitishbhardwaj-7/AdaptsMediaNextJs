import Image from "next/image";

export default function TestImagesPage() {
  const images = [
    { path: "/images/portfolio/Hyundai/Group.png", label: "Hyundai Logo (Group.png)" },
    { path: "/images/portfolio/Hyundai/butterfly_2 1.png", label: "Hyundai Bg (butterfly_2 1.png)" },
    { path: "/images/portfolio/Hyundai/Mask group.png", label: "Hyundai Mask group" },
    { path: "/images/portfolio/Hyundai/Mask group (1).png", label: "Hyundai Mask group (1)" },
    { path: "/images/portfolio/Hyundai/Mask group (2).png", label: "Hyundai Mask group (2)" },
    { path: "/images/portfolio/TheCapheVietnam/Layer_1.png", label: "Caphe Logo (Layer_1.png)" },
    { path: "/images/portfolio/TheCapheVietnam/image 30.png", label: "Caphe Bg (image 30.png)" },
    { path: "/images/portfolio/TheBliss/thebliss@4x 1.png", label: "Bliss Logo (thebliss@4x 1.png)" },
    { path: "/images/portfolio/TheBliss/Mask group.png", label: "Bliss Bg (Mask group.png)" },
    { path: "/images/portfolio/Jaywan/logo_2 1.png", label: "Jaywan Logo (logo_2 1.png)" },
    { path: "/images/portfolio/Jaywan/Sustenance_KV_V2_07 1.png", label: "Jaywan Bg (Sustenance_KV_V2_07 1.png)" },
  ];

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl mb-8">Image verification</h1>
      <div className="grid grid-cols-2 gap-8">
        {images.map((img) => (
          <div key={img.path} className="border border-gray-700 p-4 rounded bg-gray-800">
            <h2 className="text-xl mb-2">{img.label}</h2>
            <p className="text-sm text-gray-400 mb-4">{img.path}</p>
            <div className="relative w-full h-[300px] bg-black rounded overflow-hidden">
              <Image
                src={img.path}
                alt={img.label}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
