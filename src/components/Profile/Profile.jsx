// import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [imageSaving, setImageSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [imageSuccess, setImageSuccess] = useState(null);
//   const [profileImagePreview, setProfileImagePreview] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const { t } = useTranslation();

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(
//           "https://generous-optimism-production-4492.up.railway.app/api/me",
//           { headers: { "Authorization": `Bearer ${token}` } }
//         );
//         const result = await res.json();
//         setUser(result.data);
//         setFormData({
//           name: result.data.name,
//           email: result.data.email,
//           phone: result.data.phone,
//           national_id: result.data.national_id
//         });
//         setProfileImagePreview(result.data.profile_image || null);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [token]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageSelect = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedImage(e.target.files[0]);
//       setProfileImagePreview(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   const handleSaveData = async () => {
//     setSaving(true);
//     setError(null);
//     setSuccess(null);
//     try {
//       const res = await fetch(
//         "https://generous-optimism-production-4492.up.railway.app/api/profile",
//         {
//           method: "PUT",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(formData)
//         }
//       );
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Update failed");
//       setUser(data.data);
//       setSuccess("Profile updated successfully!");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleUploadImage = async () => {
//     if (!selectedImage) return;
//     setImageSaving(true);
//     setImageSuccess(null);
//     try {
//       const formPayload = new FormData();
//       formPayload.append("profile_image", selectedImage);

//       const res = await fetch(
//         "https://generous-optimism-production-4492.up.railway.app/api/profile/image",
//         {
//           method: "POST",
//           headers: { "Authorization": `Bearer ${token}` },
//           body: formPayload
//         }
//       );
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Image upload failed");
//       setUser((prev) => ({ ...prev, profile_image: data.data.profile_image }));
//       setImageSuccess("Profile image updated successfully!");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setImageSaving(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-20">Loading...</div>;

//   return (
// <div className=" py-10">

//   <div className="max-w-7xl mx-auto px-6   ">

    
//     <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10">

//       <div className="grid md:grid-cols-3 gap-10">

//         {/* الصورة + رفع */}
//         <div className="text-center md:text-left">
//           <img
//             src={profileImagePreview || user?.profile_image || "https://via.placeholder.com/150"}
//             alt="Profile"
//             className="w-36 h-36 rounded-full object-cover border-4 border-gray-300 mx-auto md:mx-0"
//           />

//           <div className="mt-6 space-y-3">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageSelect}
//               className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white file:text-sm hover:file:bg-emerald-700"
//             />
//             <button
//               onClick={handleUploadImage}
//               disabled={imageSaving}
//               className="w-full py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-60 transition"
//             >
//               {imageSaving ? t("uploading") : t("upload_image")}
//             </button>
//             {imageSuccess && <p className="text-green-600 text-sm">{imageSuccess}</p>}
//           </div>
//         </div>

//         {/* الحقول القابلة للتعديل */}
//         <div className="md:col-span-2 space-y-6">
//           <div className="grid sm:grid-cols-2 gap-5">
//             {["name", "email", "phone", "national_id"].map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                   {t(field.replace("_", " "))}
//                 </label>
//                 <input
//                   type={field === "email" ? "email" : "text"}
//                   name={field}
//                   value={formData[field] || ""}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition"
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="flex items-center gap-4 ">
//             <button
//               onClick={handleSaveData}
//               disabled={saving}
//               className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold rounded-lg transition"
//             >
//               {saving ? t("saving") : t("save_changes")}
//             </button>
//             {success && <span className="text-green-600 font-medium">{success}</span>}
//             {error && <span className="text-red-600 font-medium">{error}</span>}
//           </div>
//         </div>
//       </div>

//       {/* معلومات للقراءة فقط */}
//       <div className="mt-12 pt-8 border-t border-gray-200">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("account_info")}</h2>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
//           <div>
//             <p className="text-gray-600">{t("role")}</p>
//             <p className="font-semibold text-gray-900">{user?.role || "-"}</p>
//           </div>
//           <div>
//             <p className="text-gray-600">{t("remaining_sessions")}</p>
//             <p className="font-bold text-emerald-600 text-xl">{user?.remaining_sessions || 0}</p>
//           </div>
//           <div>
//             <p className="text-gray-600">{t("subscription_expires")}</p>
//             <p className="font-semibold text-gray-900">
//               {user?.subscription_expires_at ? new Date(user.subscription_expires_at).toLocaleDateString("ar-EG") : "-"}
//             </p>
//           </div>
//           <div>
//             <p className="text-gray-600">{t("account_status")}</p>
//             <p className={`font-semibold ${user?.is_active ? "text-green-600" : "text-red-600"}`}>
//               {user?.is_active ? t("active") : t("inactive")}
//             </p>
//           </div>
//           <div>
//             <p className="text-gray-600">{t("last_login")}</p>
//             <p className="font-semibold text-gray-900">
//               {user?.last_login_at ? new Date(user.last_login_at).toLocaleString("ar-EG") : "-"}
//             </p>
//           </div>
//           <div>
//             <p className="text-gray-600">{t("valid_subscription")}</p>
//             <p className={`font-semibold ${user?.has_valid_subscription ? "text-green-600" : "text-gray-500"}`}>
//               {user?.has_valid_subscription ? t("yes") : t("no")}
//             </p>
//           </div>
//         </div>
//       </div>

//     </div>
//   </div>
// </div>

//   );
// }

// const Info = ({ label, value, valueColor }) => (
//   <div className="p-4 bg-indigo-50 rounded-lg">
//     <h3 className="font-semibold text-indigo-700 mb-1">{label}</h3>
//     <p className={valueColor ? `font-medium text-${valueColor}-600` : ""}>{value}</p>
//   </div>
// );


// import React, { useState, useEffect, useRef } from "react";
// import { useTranslation } from "react-i18next";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [imageSaving, setImageSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [imageSuccess, setImageSuccess] = useState(null);
//   const [profileImagePreview, setProfileImagePreview] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const fileInputRef = useRef(null);
//   const { t } = useTranslation();
//   const token = localStorage.getItem("token");

//   // جلب بيانات المستخدم
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(
//           "https://generous-optimism-production-4492.up.railway.app/api/me",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const result = await res.json();
//         setUser(result.data);
//         setFormData({
//           name: result.data.name || "",
//           email: result.data.email || "",
//           phone: result.data.phone || "",
//           national_id: result.data.national_id || "",
//         });
//         setProfileImagePreview(result.data.profile_image || null);
//       } catch (err) {
//         setError("Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (token) fetchUser();
//   }, [token]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // اختيار الصورة (preview فقط)
//   const handleImageSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setProfileImagePreview(URL.createObjectURL(file));
//       setImageSuccess(null);
//       setError(null);
//     }
//   };

//   // رفع الصورة (الطريقة الصحيحة 100%)
//   const handleUploadImage = async () => {
//     if (!selectedImage) {
//       setError(t("please_select_image"));
//       return;
//     }

//     setImageSaving(true);
//     setImageSuccess(null);
//     setError(null);

//     try {
//       const formPayload = new FormData();
//       formPayload.append("profile_image", selectedImage);

//       const res = await fetch(
//         "https://generous-optimism-production-4492.up.railway.app/api/profile/image",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             // لا نضيف Content-Type أبدًا مع FormData
//           },
//           body: formPayload,
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Upload failed");
//       }

//       const newImageUrl = data.data.profile_image;
//       setUser((prev) => ({ ...prev, profile_image: newImageUrl }));
//       setProfileImagePreview(newImageUrl);
//       localStorage.setItem("profile_image", newImageUrl);
//       setImageSuccess(t("profile_image_updated") || "تم رفع الصورة بنجاح");

//       // تنظيف الإنبوت عشان تقدر ترفع نفس الصورة تاني
//       setSelectedImage(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     } catch (err) {
//       console.error("Upload error:", err);
//       setError(err.message || "فشل رفع الصورة");
//     } finally {
//       setImageSaving(false);
//     }
//   };

//   // حفظ البيانات النصية
//   const handleSaveData = async () => {
//     setSaving(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const res = await fetch(
//         "https://generous-optimism-production-4492.up.railway.app/api/profile",
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Update failed");

//       setUser(data.data);
//       setSuccess(t("profile_updated_success") || "تم حفظ التغييرات");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return <div className="text-center mt-20 text-lg">{t("loading") || "جاري التحميل..."}</div>;
//   }

//   return (
// <div className="min-h-screen py-6 px-4">
//   <div className="max-w-6xl mx-auto">
//     <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//       <div className="p-5 md:p-7">

//         {/* Profile Image + Fields */}
//         <div className="grid lg:grid-cols-3 gap-6">

//           {/* Profile Image */}
//           <div className="text-center lg:text-left">
//             <div className="relative inline-block">
//               <img
//                 src={profileImagePreview || "https://via.placeholder.com/100"}
//                 className="w-24 h-24 rounded-full object-cover border-3 border-white shadow-md shadow-green-600 mx-auto lg:mx-0"
//               />
//               <div className="absolute inset-0 rounded-full shadow-xl blur-xl -z-10 opacity-40"></div>
//             </div>  

//             <div className="mt-4 space-y-2.5">
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageSelect}
//                 className="block w-full text-xs text-gray-600 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-800 cursor-pointer"
//               />
//               <button
//                 onClick={handleUploadImage}
//                 disabled={imageSaving}
//                 className="w-52 py-2 text-sm font-medium bg-green-600 hover:bg-green-900 text-white rounded-lg disabled:opacity-50 transition"
//               >
//                 {imageSaving ? t("uploading") : t("upload_image")}
//               </button>
//               {imageSuccess && (
//                 <p className="text-sm text-gray-600 text-start">{imageSuccess}</p>
//               )}
//             </div>
//           </div>

//           {/* Editable Fields */}
//           <div className="lg:col-span-2 space-y-4">
//             <div className="grid sm:grid-cols-2 gap-3.5">
//               {["name", "email", "phone", "national_id"].map((field) => (
//                 <div key={field} className="space-y-1">
//                   <label className="block text-sm font-semibold text-gray-700">
//                     {t(field)}
//                   </label>
//                   <input
//                     type={field === "email" ? "email" : "text"}
//                     name={field}
//                     value={formData[field] || ""}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition"
//                     placeholder={t(field)}
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="flex flex-wrap items-center gap-3">
//               <button
//                 onClick={handleSaveData}
//                 disabled={saving}
//                 className="px-6 py-2 text-sm font-semibold bg-green-600 hover:bg-green-900 text-white rounded-lg disabled:opacity-50 transition"
//               >
//                 {saving ? t("saving") : t("save_changes")}
//               </button>
//               {success && <span className="text-xs text-gray-600">{success}</span>}
//               {error && <span className="text-xs text-red-600">{error}</span>}
//             </div>
//           </div>
//         </div>

//         {/* Account Info */}
//         <div className="mt-7 pt-6 border-t border-gray-200">
//           <h2 className="text-lg font-bold text-gray-800 mb-4">{t("account_info")}</h2>
//           <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
//             {[
//               { label: t("user_id"), value: user?.id || "-" },
//               { label: t("role"), value: user?.role || "-" },
//               { label: t("remaining_sessions"), value: user?.remaining_sessions || 0 },
//               { label: t("subscription_expires"), value: user?.subscription_expires_at ? new Date(user.subscription_expires_at).toLocaleDateString("en-US") : "-" },
//               { label: t("account_status"), value: user?.is_active ? t("active") : t("inactive") },
//               { label: t("last_login"), value: user?.last_login_at ? new Date(user.last_login_at).toLocaleString("en-US") : "-" },
//               { label: t("valid_subscription"), value: user?.has_valid_subscription ? t("yes") : t("no") },
//             ].map((item, idx) => (
//               <div
//                 key={idx}
//                 className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
//               >
//                 <p className="text-xs font-medium text-gray-600">{item.label}</p>
//                 <p
//                   className={`text-sm font-semibold mt-0.5 ${
//                     item.label === t("remaining_sessions") ? "text-rose-600" : "text-gray-900"
//                   }`}
//                 >
//                   {item.value}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   </div>
// </div>

//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { useTranslation } from "react-i18next";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [imageSaving, setImageSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [imageSuccess, setImageSuccess] = useState(null);
//   const [profileImagePreview, setProfileImagePreview] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const fileInputRef = useRef(null);
//   const { t } = useTranslation();
//   const token = localStorage.getItem("token");

//   // جلب بيانات المستخدم
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(
//           "https://generous-optimism-production-4492.up.railway.app/api/me",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const result = await res.json();
//         setUser(result.data);
//         setFormData({
//           name: result.data.name || "",
//           email: result.data.email || "",
//           phone: result.data.phone || "",
//           national_id: result.data.national_id || "",
//         });
//         setProfileImagePreview(result.data.profile_image || null);
//       } catch (err) {
//         setError("Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (token) fetchUser();
//   }, [token]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setProfileImagePreview(URL.createObjectURL(file));
//       setImageSuccess(null);
//       setError(null);
//     }
//   };

//   const handleUploadImage = async () => {
//     if (!selectedImage) {
//       setError(t("please_select_image"));
//       return;
//     }
//     setImageSaving(true);
//     setImageSuccess(null);
//     setError(null);
//     try {
//       const formPayload = new FormData();
//       formPayload.append("profile_image", selectedImage);

//       const res = await fetch(
//         "https://generous-optimism-production-4492.up.railway.app/api/profile/image",
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//           body: formPayload,
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Upload failed");

//       const newImageUrl = data.data.profile_image;
//       setUser((prev) => ({ ...prev, profile_image: newImageUrl }));
//       setProfileImagePreview(newImageUrl);
//       localStorage.setItem("profile_image", newImageUrl);
//       setImageSuccess(t("profile_image_updated") || "تم رفع الصورة بنجاح");
//       setSelectedImage(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     } catch (err) {
//       setError(err.message || "فشل رفع الصورة");
//     } finally {
//       setImageSaving(false);
//     }
//   };

//   const handleSaveData = async () => {
//     setSaving(true);
//     setError(null);
//     setSuccess(null);
//     try {
//       const res = await fetch(
//         "https://generous-optimism-production-4492.up.railway.app/api/profile",
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Update failed");
//       setUser(data.data);
//       setSuccess(t("profile_updated_success") || "تم حفظ التغييرات");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return <div className="text-center mt-20 text-lg">{t("loading") || "جاري التحميل..."}</div>;
//   }

//   return (
//     <div className="min-h-screen py-6 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//           <div className="p-5 md:p-7">

//             {/* Profile Image + Fields */}
//             <div className="grid lg:grid-cols-3 gap-6">

//               {/* Profile Image */}
//               <div className="text-center lg:text-left">
//                 <div className="relative inline-block">
//                   <img
//                     src={profileImagePreview || "https://via.placeholder.com/100"}
//                     className="w-24 h-24 rounded-full object-cover border-3 border-white shadow-md shadow-green-600 mx-auto lg:mx-0"
//                   />
//                   <div className="absolute inset-0 rounded-full shadow-xl blur-xl -z-10 opacity-40"></div>
//                 </div>  

//                 <div className="mt-4 space-y-2.5">
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageSelect}
//                     className="block w-full text-xs text-gray-600 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-800 cursor-pointer"
//                   />
//                   <button
//                     onClick={handleUploadImage}
//                     disabled={imageSaving}
//                     className="w-52 py-2 text-sm font-medium bg-green-600 hover:bg-green-900 text-white rounded-lg disabled:opacity-50 transition"
//                   >
//                     {imageSaving ? t("uploading") : t("upload_image")}
//                   </button>
//                   {imageSuccess && <p className="text-sm text-gray-600 text-start">{imageSuccess}</p>}
//                 </div>
//               </div>

//               {/* Editable Fields */}
//               <div className="lg:col-span-2 space-y-4">
//                 <div className="grid sm:grid-cols-2 gap-3.5">
//                   {["name", "email", "phone", "national_id"].map((field) => (
//                     <div key={field} className="space-y-1">
//                       <label className="block text-sm font-semibold text-gray-700">{t(field)}</label>
//                       <input
//                         type={field === "email" ? "email" : "text"}
//                         name={field}
//                         value={formData[field] || ""}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition"
//                         placeholder={t(field)}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex flex-wrap items-center gap-3">
//                   <button
//                     onClick={handleSaveData}
//                     disabled={saving}
//                     className="px-6 py-2 text-sm font-semibold bg-green-600 hover:bg-green-900 text-white rounded-lg disabled:opacity-50 transition"
//                   >
//                     {saving ? t("saving") : t("save_changes")}
//                   </button>
//                   {success && <span className="text-xs text-gray-600">{success}</span>}
//                   {error && <span className="text-xs text-red-600">{error}</span>}
//                 </div>
//               </div>
//             </div>

//             {/* إحصائيات سريعة + جلسات الأسبوع */}
//             {token && user && (
//               <div className="mt-10">

//                 {/* إحصائيات سريعة */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
//                   <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
//                     <p className="text-sm font-medium text-gray-600">{t("remaining_sessions")}</p>
//                     <p className="text-2xl font-bold text-gray-900 mt-2">{user.remaining_sessions || 0}</p>
//                   </div>
//                   <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
//                     <p className="text-sm font-medium text-gray-600">{t("total_attendances")}</p>
//                     <p className="text-2xl font-bold text-gray-900 mt-2">{user.recent_attendances?.length || 0}</p>
//                   </div>
//                   <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
//                     <p className="text-sm font-medium text-gray-600">{t("profile_completion")}</p>
//                     <p className="text-2xl font-bold text-gray-900 mt-2">{user.stats?.profile_completion || 0}%</p>
//                     <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                       <div
//                         className="bg-green-600 h-2 rounded-full transition-all duration-700"
//                         style={{ width: `${user.stats?.profile_completion || 0}%` }}
//                       />
//                     </div>
//                   </div>
//                   <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
//                     <p className="text-sm font-medium text-gray-600">{t("subscription_status")}</p>
//                     <p className="text-2xl font-bold text-green-600 mt-2">
//                       {user.stats?.has_valid_subscription ? t("active") : t("inactive")}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Expires: {user.stats?.subscription_expires_at ? new Date(user.stats.subscription_expires_at).toLocaleDateString("en-GB") : "--"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* جلسات الأسبوع والحضور */}
//                 <div className="mb-12">
//                   <h2 className="text-lg font-bold text-gray-800 mb-4">{t("weekly_sessions")}</h2>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
//                     {user.weekly_sessions?.length > 0 ? (
//                       user.weekly_sessions.map((session, idx) => (
//                         <div
//                           key={idx}
//                           className={`p-3 rounded-xl border shadow-sm text-center transition ${
//                             session.attended ? "bg-green-50 border-green-400" : "bg-gray-50 border-gray-200"
//                           }`}
//                         >
//                           <p className="text-xs font-medium text-gray-600">{t(session.day)}</p>
//                           <p className="text-sm font-bold mt-1">
//                             {session.attended ? t("attended") : t("missed")}
//                           </p>
//                           <p className="text-xs text-gray-500 mt-1">{session.sessions_count || 0} {t("sessions")}</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-gray-500 col-span-full text-center">{t("no_sessions_available")}</p>
//                     )}
//                   </div>
//                 </div>

//               </div>
//             )}

//             {/* Account Info */}
//             <div className="mt-7 pt-6 border-t border-gray-200">
//               <h2 className="text-lg font-bold text-gray-800 mb-4">{t("account_info")}</h2>
//               <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
//                 {[
                
//                   { label: t("remaining_sessions"), value: user?.remaining_sessions || 0 },
//                   { label: t("subscription_expires"), value: user?.subscription_expires_at ? new Date(user.subscription_expires_at).toLocaleDateString("en-US") : "-" },
//                   { label: t("account_status"), value: user?.is_active ? t("active") : t("inactive") },
//                   { label: t("last_login"), value: user?.last_login_at ? new Date(user.last_login_at).toLocaleString("en-US") : "-" },
//                   { label: t("valid_subscription"), value: user?.has_valid_subscription ? t("yes") : t("no") },
//                 ].map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
//                   >
//                     <p className="text-xs font-medium text-gray-600">{item.label}</p>
//                     <p
//                       className={`text-sm font-semibold mt-0.5 ${
//                         item.label === t("remaining_sessions") ? "text-rose-600" : "text-gray-900"
//                       }`}
//                     >
//                       {item.value}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { useTranslation } from "react-i18next";

// export default function Profile() {
//   const [user, setUser] = useState(null); // from /api/me
//   const [dashboardData, setDashboardData] = useState(null); // from /api/subscriber/dashboard
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [imageSaving, setImageSaving] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [imageSuccess, setImageSuccess] = useState(null);
//   const [profileImagePreview, setProfileImagePreview] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const fileInputRef = useRef(null);
//   const { t } = useTranslation();
//   const token = localStorage.getItem("token");

//   // جلب بيانات المستخدم من /api/me
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(
//           "https://generous-optimism-production-4492.up.railway.app/api/me",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const result = await res.json();
//         if (result.data) {
//           const u = result.data;
//           setUser(u);
//           setFormData({
//             name: u.name || "",
//             email: u.email || "",
//             phone: u.phone || "",
//             national_id: u.national_id || "",
//           });
//           setProfileImagePreview(u.profile_image || null);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     if (token) fetchUser();
//   }, [token]);

//   // جلب dashboard من /api/subscriber/dashboard
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await fetch(
//           "https://generous-optimism-production-4492.up.railway.app/api/subscriber/dashboard",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const result = await res.json();
//         if (result.success) {
//           // نحط خاصية attended/missed تلقائيًا حسب بياناتك
//           const enrichedSessions = result.data.current_week_sessions.map((s) => ({
//             ...s,
//             attended: s.attended || false,
//             missed: s.missed || false,
//           }));
//           setDashboardData({ ...result.data, current_week_sessions: enrichedSessions });
//         }
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (token) fetchDashboard();
//   }, [token]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setProfileImagePreview(URL.createObjectURL(file));
//       setImageSuccess(null);
//       setError(null);
//     }
//   };

//   const handleUploadImage = async () => {
//     if (!selectedImage) {
//       setError(t("please_select_image"));
//       return;
//     }
//     setImageSaving(true);
//     setImageSuccess(null);
//     setError(null);
//     try {
//       const formPayload = new FormData();
//       formPayload.append("profile_image", selectedImage);

//       const res = await fetch(
//         "https://generous-optimism-production-4492.up.railway.app/api/profile/image",
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//           body: formPayload,
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Upload failed");

//       const newImageUrl = data.data.profile_image;
//       setUser((prev) => ({ ...prev, profile_image: newImageUrl }));
//       setProfileImagePreview(newImageUrl);
//       localStorage.setItem("profile_image", newImageUrl);
//       setImageSuccess(t("profile_image_updated") || "تم رفع الصورة بنجاح");
//       setSelectedImage(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     } catch (err) {
//       setError(err.message || "فشل رفع الصورة");
//     } finally {
//       setImageSaving(false);
//     }
//   };

//   const handleSaveData = async () => {
//     setSaving(true);
//     setError(null);
//     setSuccess(null);
//     try {
//       const res = await fetch(
//         "https://generous-optimism-production-4492.up.railway.app/api/profile",
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Update failed");
//       setUser(data.data);
//       setSuccess(t("profile_updated_success") || "تم حفظ التغييرات");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return <div className="text-center mt-20 text-lg">{t("loading") || "جاري التحميل..."}</div>;
//   }

//   return (
//     <div className="min-h-screen py-6 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//           <div className="p-5 md:p-7">

//             {/* Profile Image + Fields */}
//             <div className="grid lg:grid-cols-3 gap-6">
//               {/* Profile Image */}
//               <div className="text-center lg:text-left">
//                 <div className="relative inline-block">
//                   <img
//                     src={profileImagePreview || "https://via.placeholder.com/100"}
//                     className="w-24 h-24 rounded-full object-cover border-3 border-white shadow-md shadow-green-600 mx-auto lg:mx-0"
//                   />
//                   <div className="absolute inset-0 rounded-full shadow-xl blur-xl -z-10 opacity-40"></div>
//                 </div>
//                 <div className="mt-4 space-y-2.5">
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageSelect}
//                     className="block w-full text-xs text-gray-600 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-800 cursor-pointer"
//                   />
//                   <button
//                     onClick={handleUploadImage}
//                     disabled={imageSaving}
//                     className="w-52 py-2 text-sm font-medium bg-green-600 hover:bg-green-900 text-white rounded-lg disabled:opacity-50 transition"
//                   >
//                     {imageSaving ? t("uploading") : t("upload_image")}
//                   </button>
//                   {imageSuccess && <p className="text-sm text-gray-600 text-start">{imageSuccess}</p>}
//                 </div>
//               </div>

//               {/* Editable Fields */}
//               <div className="lg:col-span-2 space-y-4">
//                 <div className="grid sm:grid-cols-2 gap-3.5 ">
//                   {["name", "email", "phone", "national_id"].map((field) => (
//                     <div key={field} className="space-y-1">
//                       <label className="block text-sm font-semibold text-gray-700">{t(field)}</label>
//                       <input
//                         type={field === "email" ? "email" : "text"}
//                         name={field}
//                         value={formData[field] || ""}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm shadow-md bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition"
//                         placeholder={t(field)}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex flex-wrap items-center gap-3">
//                   <button
//                     onClick={handleSaveData}
//                     disabled={saving}
//                     className="px-6 py-2 text-sm font-semibold  bg-green-600 hover:bg-green-900 text-white rounded-lg disabled:opacity-50 transition"
//                   >
//                     {saving ? t("saving") : t("save_changes")}
//                   </button>
//                   {success && <span className="text-xs text-gray-600">{success}</span>}
//                   {error && <span className="text-xs text-red-600">{error}</span>}
//                 </div>
//               </div>
//             </div>

//             {/* ===== Account Info from /api/me ===== */}
//             {user && (
//               <div className="mt-7 pt-6 border-t border-gray-200">
//                 <h2 className="text-lg font-bold text-gray-800 mb-4">{t("account_info")}</h2>
//                 <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
//                   {[
//                     // { label: t("remaining_sessions"), value: user.stats?.remaining_sessions || 0 },
//                     { label: t("subscription_expires"), value: user.stats?.subscription_expires_at ? new Date(user.stats.subscription_expires_at).toLocaleDateString("en-US") : "-" },
//                     { label: t("account_status"), value: user.is_active ? t("active") : t("inactive") },
//                     { label: t("last_login"), value: user.last_login_at ? new Date(user.last_login_at).toLocaleString("en-US") : "-" },
//                     { label: t("valid_subscription"), value: user.stats?.has_valid_subscription ? t("yes") : t("no") },
//                   ].map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="p-4 bg-gray-50 rounded-lg border shadow-md border-gray-200 hover:bg-gray-100 transition"
//                     >
//                       <p className="text-xs font-medium text-gray-600">{item.label}</p>
//                       <p className={`text-sm font-semibold mt-0.5 ${item.label === t("remaining_sessions") ? "text-rose-600" : "text-gray-900"}`}>
//                         {item.value}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ===== Dashboard Stats + Weekly Sessions + Recommendations ===== */}
//             {dashboardData && (
//               <div className="mt-10">
//                 {/* Stats */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
//                   <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
//                     <p className="text-sm font-medium text-red-500">{t("remaining_sessions")}</p>
//                     <p className="text-2xl font-bold text-red-500 mt-2">{dashboardData.stats.remaining_sessions}</p>
//                   </div>
//                   <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
//                     <p className="text-sm font-medium text-gray-600">{t("total_attendances")}</p>
//                     <p className="text-2xl font-bold text-gray-900 mt-2">{dashboardData.stats.total_attendances}</p>
//                   </div>
//                   <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
//                     <p className="text-sm font-medium text-gray-600">{t("profile_completion")}</p>
//                     <p className="text-2xl font-bold text-gray-900 mt-2">{dashboardData.stats.profile_completion}%</p>
//                   </div>
//                   <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
//                     <p className="text-sm font-medium text-gray-600">{t("subscription_status")}</p>
//                     <p className="text-2xl font-bold text-green-600 mt-2">
//                       {dashboardData.stats.has_valid_subscription ? t("active") : t("inactive")}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Weekly Sessions - Advanced */}
//                 {/* <div className="mb-8">
//                   <h2 className="text-lg font-bold text-gray-800 mb-4">{t("Weekly_sessions")}</h2>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
//                     {dashboardData.current_week_sessions.length > 0 ? (
//                       dashboardData.current_week_sessions.map((s, idx) => {
//                         let status = s.attended ? "attended" : s.missed ? "missed" : "upcoming";
//                         const statusColors = {
//                           attended: "bg-green-50 border-green-400",
//                           missed: "bg-red-50 border-red-400",
//                           upcoming: "bg-gray-50 border-gray-200 text-blue-600",
//                         };
//                         return (
//                           <div
//                             key={idx}
//                             className={`p-5 rounded-xl border shadow-md shadow-green-700 text-center transition ${statusColors[status]}`}
//                           >
//                             <p className="text-sm font-medium text-gray-600">{s.day_name_ar}</p>
//                             <p className="text-sm font-bold mt-1 text-black">{s.session.title}</p>
//                             <p className="text-sm text-gray-500 mt-1">{s.session.start_time} - {s.session.end_time}</p>
//                             <p className="text-sm font-semibold mt-1 capitalize">
//                               {status === "attended" ? t("attended") : status === "missed" ? t("missed") : t("upcoming")}
//                             </p>
//                           </div>
//                         );
//                       })
//                     ) : (
//                       <p className="text-gray-500 col-span-full text-center">{t("no_sessions_available")}</p>
//                     )}
//                   </div>
//                 </div> */}

//                 {/* Recommendations */}
//                 {/* <div>
//                   <h2 className="text-lg font-bold text-gray-800 mb-4">{t("recommendations")}</h2>
//                   <div className="space-y-2">
//                     {dashboardData.recommendations.map((rec, idx) => (
//                       <div key={idx} className={`p-3 rounded-lg border ${rec.priority === "high" ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50"}`}>
//                         <p className="font-semibold text-gray-700">{rec.title}</p>
//                         <p className="text-sm text-gray-600">{rec.message}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div> */}
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const [user, setUser] = useState(null); // البيانات الأصلية من /api/me
  const [dashboardData, setDashboardData] = useState(null); // بيانات الdashboard
  const [formData, setFormData] = useState({}); // نسخة مستقلة للفورم
  const [profileImagePreview, setProfileImagePreview] = useState(null); // نسخة مستقلة للصورة
  const [selectedImage, setSelectedImage] = useState(null); // الصورة الجديدة قبل الرفع

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageSaving, setImageSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imageSuccess, setImageSuccess] = useState(null);

  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const token = localStorage.getItem("token");

  // جلب بيانات المستخدم
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://generous-optimism-production-4492.up.railway.app/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (result.data) {
          setUser(result.data);
          setFormData({
            name: result.data.name || "",
            email: result.data.email || "",
            phone: result.data.phone || "",
            national_id: result.data.national_id || "",
          });
          setProfileImagePreview(result.data.profile_image || null);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (token) fetchUser();
  }, [token]);

  // جلب dashboard
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("https://generous-optimism-production-4492.up.railway.app/api/subscriber/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (result.success) {
          const enrichedSessions = result.data.current_week_sessions.map((s) => ({
            ...s,
            attended: s.attended || false,
            missed: s.missed || false,
          }));
          setDashboardData({ ...result.data, current_week_sessions: enrichedSessions });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchDashboard();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
      setImageSuccess(null);
      setError(null);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage) {
      setError(t("please_select_image"));
      return;
    }
    setImageSaving(true);
    setImageSuccess(null);
    setError(null);
    try {
      const formPayload = new FormData();
      formPayload.append("profile_image", selectedImage);

      const res = await fetch("https://generous-optimism-production-4492.up.railway.app/api/profile/image", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formPayload,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      // تحديث user فقط بعد النجاح
      setUser((prev) => ({ ...prev, profile_image: data.data.profile_image }));
      setProfileImagePreview(data.data.profile_image);
      localStorage.setItem("profile_image", data.data.profile_image);
      setImageSuccess(t("profile_image_updated") || "تم رفع الصورة بنجاح");
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err.message || "فشل رفع الصورة");
    } finally {
      setImageSaving(false);
    }
  };

  const handleSaveData = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("https://generous-optimism-production-4492.up.railway.app/api/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      // تحديث user بعد حفظ الفورم فقط
      setUser(data.data);
      setSuccess(t("profile_updated_success") || "تم حفظ التغييرات");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-20 text-lg">{t("loading") || "جاري التحميل..."}</div>;

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-100 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-5 md:p-7">
            {/* Profile + Form */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  <img
                    src={profileImagePreview || "https://via.placeholder.com/100"}
                    className="w-24 h-24 rounded-full object-cover border-3 border-white shadow-md shadow-green-600 mx-auto lg:mx-0"
                  />
                  <div className="absolute inset-0 rounded-full shadow-xl blur-xl -z-10 opacity-40"></div>
                </div>
                <div className="mt-4 space-y-2.5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="block w-full text-xs text-gray-600 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-800 cursor-pointer"
                  />
                  <button
                    onClick={handleUploadImage}
                    disabled={imageSaving}
                    className="w-52 py-2 text-sm font-medium bg-green-600 hover:bg-green-900 text-white rounded-lg disabled:opacity-50 transition"
                  >
                    {imageSaving ? t("uploading") : t("upload_image")}
                  </button>
                  {imageSuccess && <p className="text-sm text-gray-600 text-start">{imageSuccess}</p>}
                </div>
              </div>

              {/* Form Fields */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid sm:grid-cols-2 gap-3.5 ">
                  {["name", "email", "phone", "national_id"].map((field) => (
                    <div key={field} className="space-y-1">
                      <label className="block text-sm font-semibold text-gray-700">{t(field)}</label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm shadow-md bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition"
                        placeholder={t(field)}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleSaveData}
                    disabled={saving}
                    className="px-6 py-2 text-sm font-semibold bg-green-600 hover:bg-green-900 text-white rounded-lg disabled:opacity-50 transition"
                  >
                    {saving ? t("saving") : t("save_changes")}
                  </button>
                  {success && <span className="text-xs text-gray-600">{success}</span>}
                  {error && <span className="text-xs text-red-600">{error}</span>}
                </div>
              </div>
            </div>

            {/* Account Info */}
            {user && (
              <div className="mt-7 pt-6 border-t border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4">{t("account_info")}</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { label: t("subscription_expires"), value: user.stats?.subscription_expires_at ? new Date(user.stats.subscription_expires_at).toLocaleDateString("en-US") : "-" },
                    { label: t("account_status"), value: user.is_active ? t("active") : t("inactive") },
                    { label: t("last_login"), value: user.last_login_at ? new Date(user.last_login_at).toLocaleString("en-US") : "-" },
                    { label: t("valid_subscription"), value: user.stats?.has_valid_subscription ? t("yes") : t("no") },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg border shadow-md border-gray-200 hover:bg-gray-100 transition">
                      <p className="text-xs font-medium text-gray-600">{item.label}</p>
                      <p className="text-sm font-semibold mt-0.5 text-gray-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dashboard */}
            {dashboardData && (
              <div className="mt-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
                    <p className="text-sm font-medium text-red-500">{t("remaining_sessions")}</p>
                    <p className="text-2xl font-bold text-red-500 mt-2">{dashboardData.stats.remaining_sessions}</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
                    <p className="text-sm font-medium text-gray-600">{t("total_attendances")}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{dashboardData.stats.total_attendances}</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
                    <p className="text-sm font-medium text-gray-600">{t("profile_completion")}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{dashboardData.stats.profile_completion}%</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
                    <p className="text-sm font-medium text-gray-600">{t("subscription_status")}</p>
                    <p className="text-2xl font-bold text-green-600 mt-2">{dashboardData.stats.has_valid_subscription ? t("active") : t("inactive")}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
