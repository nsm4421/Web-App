/** @type {import('next').NextConfig} */
const nextConfig = {
    // StrictMode를 설정하는 경우, 개발모드에서 일부 Effect가 두번씩 실행됨.
    // 그로 인해 useEffect 내부 함수가 여러번 실행됨.
    // Production에서는 문제가 되지 않지만, 편의를 위해 비활성화
    reactStrictMode: false
};

export default nextConfig;
