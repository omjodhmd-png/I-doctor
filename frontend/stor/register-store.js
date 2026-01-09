import { create } from "zustand";

const initialDoctorState = {
  fullName: "",
  speciality: "",
  bio: "",
  workTime: "",
  phone: "",
  price: 0,
  latitude: null,
  longitude: null,
};


const useCreateDoctorStore = create((set) => ({
  doctor: initialDoctorState,

  resetDoctor: () =>
    set(() => ({
      doctor: initialDoctorState,
    })),

  setDoctorField: (field, value) =>
    set((state) => ({
      doctor: {
        ...state.doctor,
        [field]: value,
      },
    })),
}));

export default useCreateDoctorStore;
