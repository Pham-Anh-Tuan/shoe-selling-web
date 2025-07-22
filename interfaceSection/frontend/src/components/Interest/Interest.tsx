import { FaExchangeAlt } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import { GiFoodTruck } from 'react-icons/gi'
import { TbTruckDelivery } from 'react-icons/tb'

const Interest = () => {
    return (
        <div className="mb-6">
            <div className="container flex items-center">
                <div className="grid grid-cols-2 gap-14 mx-auto p-6 w-full bg-gray-100 dark:bg-gray-800 rounded-md">
                    <div data-aos="fade-up" className="flex items-center gap-4">
                        <GiFoodTruck className="h-16 w-16 sm:h-20 sm:w-20 shadow-sm p-2 rounded-full bg-orange-100 dark:bg-orange-400" />
                        <p className='text-2xl sm:text-3xl'>Giao hàng siêu nhanh</p>
                    </div>

                    <div data-aos="fade-up" className="flex items-center gap-4">
                        <TbTruckDelivery className="h-16 w-16 sm:h-20 sm:w-20 shadow-sm p-2 rounded-full bg-violet-100 dark:bg-violet-400" />
                        <p className='text-2xl sm:text-3xl'>Miễn phí vận chuyển toàn quốc</p>
                    </div>

                    <div data-aos="fade-up" className="flex items-center gap-4">
                        <FaExchangeAlt className="h-16 w-16 sm:h-20 sm:w-20 shadow-sm p-2 rounded-full bg-green-100 dark:bg-green-400" />
                        <p className='text-2xl sm:text-3xl'>Đổi trả trong vòng 1 tháng</p>
                    </div>
                    <div data-aos="fade-up" className="flex items-center gap-4">
                        <FiPhone className="h-16 w-16 sm:h-20 sm:w-20 shadow-sm p-2 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                        <p className='text-2xl sm:text-3xl'>Hotline 1900 8897</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interest