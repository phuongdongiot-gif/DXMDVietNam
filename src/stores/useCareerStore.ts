import { create } from 'zustand';

export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  salary: string;
  description: string;
}

interface CareerStore {
  jobs: Job[];
  isLoading: boolean;
  fetchJobs: () => Promise<void>;
}

export const useCareerStore = create<CareerStore>((set) => ({
  jobs: [
    {
      id: 1,
      title: "Chuyên viên tư vấn Bất động sản",
      department: "Kinh doanh",
      location: "Hồ Chí Minh",
      salary: "Thỏa thuận",
      description: "Tư vấn và phân phối các dự án căn hộ cao cấp."
    },
    {
      id: 2,
      title: "Trưởng nhóm Marketing",
      department: "Marketing",
      location: "Bình Dương",
      salary: "Lên đến 30M",
      description: "Lên kế hoạch và thực thi chiến dịch tiếp thị."
    }
  ],
  isLoading: false,
  fetchJobs: async () => {
    // Tương lai sẽ kết nối API tuyển dụng từ WP
    set({ isLoading: false });
  }
}));
