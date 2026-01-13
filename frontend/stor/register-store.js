import { create } from "zustand";

const initialDoctorState = {
  fullName: "",
  speciality: "",
  clinicName: "",
  bio: "",
  experience: "",
  languages: "",
  workTime: "",
  availabilityDays: "",
  consultationDuration: "",
  phone: "",
  price: "",
  address: "",
  latitude: null,
  longitude: null,
  certifications: "",
};

const useCreateDoctorStore = create((set) => ({
  doctor: initialDoctorState,

  setDoctorField: (field, value) =>
  set((state) => ({
    doctor: {
      ...state.doctor,
      [field]:
        field === "latitude" || field === "longitude"
          ? value !== null
            ? Number(value)
            : null
          : value,
    },
  })),


  resetDoctor: () =>
    set({
      doctor: initialDoctorState,
    }),
}));

export default useCreateDoctorStore;
