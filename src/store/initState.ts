import { headers } from "next/headers";

export async function fetchData() {
  return 11;
}

/**
 * Xử lý lấy initState trên server
 * @param pr
 * @returns
 */
export const initState = async (
  pr?: Promise<Partial<any>>
): Promise<Partial<any>> => {
  const [device, otherData] = await Promise.all([getDevice(), pr]);
  return {
    app: {
      device: device,
    },
    ...(otherData ?? {}),
  };
};

/**
 * Đọc thông tin thiết bị từ user-agent
 * | chỉ dùng trên server
 * */
async function getDevice() {
  const userAgent = (await headers()).get("user-agent") || "";

  const isMobile =
    /Android.*Mobile|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(
      userAgent
    );

  if (!isMobile) {
    return "desktop";
  }
  return "mobile";
}
