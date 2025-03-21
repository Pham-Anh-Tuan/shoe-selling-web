import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from "react-icons/fa";
import footerLogo from "../../assets/logo.png";
import Banner from "../../assets/website/footer-pattern.jpg";

const BannerImg = {
    backgroundImage: `url(${Banner})`,
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
};

const InformationLinks = [
    {
        title: "Giới thiệu",
        link: "/#",
    },
    {
        title: "Liên hệ",
        link: "/#about",
    },
    {
        title: "Hệ thống cửa hàng",
        link: "/#contact",
    },
];

const FooterLinks = [
    {
        title: "Chính sách vận chuyển",
        link: "/#",
    },
    {
        title: "Chính sách đổi hàng",
        link: "/#about",
    },
    {
        title: "Chính sách bảo hành",
        link: "/#contact",
    }
];


const Footer = () => {
    return (
        <div style={BannerImg}
            className="text-white">
            <div className="container">
                <div data-aos = "zoom-in" className="grid 
                md:grid-cols-3 pb-44 pt-5">
                    {/* company details */}
                    <div className="py-8 px-4">
                        <h1 className="sm:text-xl text-xl font-bold 
                        sm:text-left text-justify mb-3 flex 
                        items-center gap-3">
                            <img src={footerLogo} alt=""
                                className="max-w-[50px]" />
                            KuShoe</h1>
                        <p>
                            Chúng tôi chuyên cung cấp những đôi giày chất lượng, hợp 
                            xu hướng với mức giá phải chăng.
                        </p>
                    </div>
                    {/* Footer Links */}
                    <div className="grid grid-cols-2 sm:grid-cols-3
                    col-span-2 md:pl-10">
                        <div>
                            <div className="py-8 px-4">
                                <h1 className="sm:text-2xl text-xl
                                font-bold sm:text-left text-justify mb-3"
                                >Thông tin
                                </h1>
                                <ul className="flex flex-col gap-3">
                                    {InformationLinks.map((link) => (
                                        <li
                                            className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                                            key={link.title}
                                        >
                                            <span>{link.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div>
                            <div className="py-8 px-4">
                                <h1 className="sm:text-2xl text-xl
                                font-bold sm:text-left text-justify mb-3"
                                >Chính sách
                                </h1>
                                <ul className="flex flex-col gap-3">
                                    {FooterLinks.map((link) => (
                                        <li
                                            className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                                            key={link.title}
                                        >
                                            <span>{link.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* social links */}
                        <div>
                            <div className="flex items-center gap-3 mt-8">
                                <a href="#">
                                    <FaInstagram className="text-3xl" />
                                </a>

                                <a href="#">
                                    <FaFacebook className="text-3xl" />
                                </a>

                                <a href="#">
                                    <FaLinkedin className="text-3xl" />
                                </a>
                            </div>
                            <div className="mt-6">
                                <div className="flex items-center gap-3">
                                    <FaLocationArrow />
                                    <p>Linh Xuân, Thủ Đức</p>
                                </div>
                                <div className="flex items-center gap-3 mt-3">
                                    <FaMobileAlt />
                                    <p>+84 123456789</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default Footer;