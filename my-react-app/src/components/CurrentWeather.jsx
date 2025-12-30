import { useState } from 'react';

export default function CurrentWeather({ data }) {
  const [isCelsius, setIsCelsius] = useState(true);

  const temp = data?.temp || 18;
  const displayTemp = isCelsius ? temp : Math.round((temp * 9) / 5 + 32);

  return (
    <div className="lg:col-span-2 relative overflow-hidden rounded-xl bg-surface-dark border border-[#233c48] shadow-lg group hover:border-primary/50 transition-all duration-300">
      {/* Background Map Image */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1goRRVY6DKhiNl74BElp7UNEY6LiN0UxV6587AqS9XsvfGn3bl7n4HPWPb1hYS764T_4IA8UU6ntoobcyvk7XZT_SVk0TJ2bAf_xGViJH-ggV5Irv9HA9kk5H4MPIv8lkQ5MM09_-ANnW2OTT8QkCVMJPwlr-rqXYZT6Md86tuM5AJzRaE76ZMtJietxhcyq_Yp6dhkhX40hsOzxymCfqHV9dV5fg-uyidKpwT5KpmwwgmMQMA85r8HWWTcjKwV5CUZLalAlRIyU')`
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/90 to-transparent z-0"></div>

      <div className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between h-full gap-8">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-start gap-4">
            {/* Animated Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full"></div>
              <span
                className="material-symbols-outlined text-8xl text-white relative z-10 drop-shadow-md"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 200" }}
              >
                {data?.icon || 'partly_cloudy_day'}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-start">
                <span className="text-[6rem] font-bold leading-none tracking-tighter text-white">
                  {displayTemp}
                </span>
                {/* Unit Toggle */}
                <div className="mt-4 ml-4 bg-[#111c22] rounded-lg p-1 flex shadow-inner">
                  <button
                    onClick={() => setIsCelsius(true)}
                    className={`px-3 py-1 rounded-md text-sm font-bold transition-all ${
                      isCelsius
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-[#92b7c9] hover:text-white'
                    }`}
                  >
                    °C
                  </button>
                  <button
                    onClick={() => setIsCelsius(false)}
                    className={`px-3 py-1 rounded-md text-sm font-bold transition-all ${
                      !isCelsius
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-[#92b7c9] hover:text-white'
                    }`}
                  >
                    °F
                  </button>
                </div>
              </div>
              <p className="text-2xl font-medium text-[#92b7c9] mt-2">
                {data?.description || 'Scattered Clouds'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 min-w-[200px] bg-[#111c22]/60 p-5 rounded-xl backdrop-blur-sm border border-[#233c48]">
          <div className="flex items-center justify-between">
            <span className="text-[#92b7c9] text-sm">Feels Like</span>
            <span className="text-white text-lg font-bold">{data?.feelsLike || 16}°</span>
          </div>
          <div className="h-[1px] w-full bg-[#233c48]"></div>
          <div className="flex items-center justify-between">
            <span className="text-[#92b7c9] text-sm">Low / High</span>
            <span className="text-white text-lg font-bold">
              {data?.low || 14}° / {data?.high || 20}°
            </span>
          </div>
          <div className="h-[1px] w-full bg-[#233c48]"></div>
          <div className="flex items-center justify-between">
            <span className="text-[#92b7c9] text-sm">Precipitation</span>
            <span className="text-white text-lg font-bold">{data?.precipitation || 12}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
