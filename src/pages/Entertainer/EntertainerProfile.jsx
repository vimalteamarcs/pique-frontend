import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import RadioButton from "../../components/RadioButton";
import Button from "../../components/Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import DashLayoutEnter from "../../components/Entertainer/DashLayoutEnter";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";
import MediaUpload from "../../components/Entertainer/MediaUpload";
import EntertainerDetailsForm from "../../components/Entertainer/EntertainerDetails";
import EnterAccountSidebar from "../../components/Entertainer/EnterAccountSidebar";
import EnterProfileContainer from "../../components/Entertainer/EnterProfileContainer";

export default function Profile() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    name: "",
    category: null,
    specific_category: null,
    bio: "",
    phone1: "",
    phone2: "",
    performanceRole: "",
    availability: "",
    pricePerEvent: null,
    socialLinks: "",
    vaccinated: "",
    status: "active",
    userId: userId,
    image: [],
    video: [],
    headshot: null,
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [headshot, setHeadshot] = useState(null);
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [tempLink, setTempLink] = useState("");
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);

  const performanceRole = [
    { value: "soloist", label: "Soloist" },
    { value: "duo", label: "Duo" },
    { value: "trio", label: "Trio" },
  ];

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}entertainers/categories/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Categories:", response.data);

        if (
          response.data &&
          response.data.categories &&
          Array.isArray(response.data.categories)
        ) {
          setCategories(
            response.data.categories.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))
          );
        } else {
          console.error(
            "Unexpected API response format for categories:",
            response.data
          );
          toast.error("Failed to load categories. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchEntertainer = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}entertainers`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const entertainer = response.data?.entertainers?.[0];

        if (entertainer) {
          console.log("Fetched Entertainer:", entertainer);
          localStorage.setItem("entertainerId", entertainer.id);

          setFormData({
            ...entertainer,
            category: Number(entertainer.category) || "",
            specific_category: Number(entertainer.specific_category) || "",
          });

          setIsEditing(true);

          // Fetch subcategories if a category exists
          if (entertainer.category) {
            fetchSubcategories(entertainer.category);
          }
        }
      } catch (error) {
        console.error("Error fetching entertainer:", error);
        toast.error("Failed to fetch entertainer data.");
      }
    };

    const fetchSubcategories = async (categoryId) => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }entertainers/categories/subcategories?id=${categoryId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (
          response.data?.categories &&
          Array.isArray(response.data.categories)
        ) {
          setSubcategories(
            response.data.categories.map((sub) => ({
              value: sub.id,
              label: sub.name,
            }))
          );
        } else {
          setSubcategories([]);
          toast.error("No subcategories found.");
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Failed to fetch subcategories.");
      }
    };

    fetchCategories();
    fetchEntertainer();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTempLink(value);
  };

  //   const handleCategoryChange = async (selectedValue) => {
  //     console.log("handleCategoryChange triggered"); // Check if function is being called
  //     console.log("Selected Category ID:", selectedValue);

  //   setFormData((prev) => ({
  //     ...prev,
  //     category: selectedValue,
  //     specific_category: "",
  //   }));

  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_URL}entertainers/categories/subcategories?id=${selectedValue}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Categories from API:", response.data.categories);

  //     if (response.data && Array.isArray(response.data.categories)) {
  //       const filteredSubcategories = response.data.categories.filter(
  //         (sub) => sub.parentId === Number(selectedValue)
  //       );

  //       console.log("Filtered Subcategories:", filteredSubcategories);

  //       setSubcategories(
  //         filteredSubcategories.map((sub) => ({
  //           value: sub.id,
  //           label: sub.name,
  //         }))
  //       );
  //     // if (response.data && response.data.categories && Array.isArray(response.data.categories)) {
  //     //   setSubcategories(
  //     //     response.data.categories.map((sub) => ({
  //     //       value: sub.id,
  //     //       label: sub.name,
  //     //     }))
  //     //   );
  //     } else {
  //       console.error("No subcategory found:", response.data);
  //       setSubcategories([]);
  //       toast.error("No subcategories found for the selected category");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching subcategories:", error);
  //     setSubcategories([]);
  //     toast.error("Failed to fetch subcategories.");
  //   }
  // };

  const handleCategoryChange = async (selectedValue) => {
    console.log("handleCategoryChange triggered:", selectedValue);

    setFormData((prev) => ({
      ...prev,
      category: selectedValue,
      specific_category: "",
    }));

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }entertainers/categories/subcategories?id=${selectedValue}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (
        response.data?.categories &&
        Array.isArray(response.data.categories)
      ) {
        setSubcategories(
          response.data.categories.map((sub) => ({
            value: sub.id,
            label: sub.name,
          }))
        );
      } else {
        setSubcategories([]);
        toast.error("No subcategories found.");
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast.error("Failed to fetch subcategories.");
    }
  };

  const handleSubCategoryChange = (selectedValue) => {
    setFormData((prev) => ({
      ...prev,
      specific_category: selectedValue,
    }));
  };

  const handleDeleteImage = (index) => {
    setImage((prev) => {
      const updatedImages = prev.filter((_, i) => i !== index);
      setFormData((prevData) => ({ ...prevData, image: updatedImages }));
      return updatedImages;
    });
  };

  const handleDeleteVideo = (index) => {
    setVideo((prev) => {
      const updatedVideos = prev.filter((_, i) => i !== index);
      setFormData((prevData) => ({ ...prevData, video: updatedVideos }));
      return updatedVideos;
    });
  };

  const handleDeleteHeadshot = () => {
    setHeadshot(null);
    setFormData((prevData) => ({ ...prevData, headshot: "" }));
  };

  const fetchMedia = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}media/uploads`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200 && response.data?.media) {
        console.log("Fetched Media Successfully:", response.data.media);
        setMedia(response.data.media);

        if (onMediaUpdate) {
          onMediaUpdate(response.data.media);
        }
      } else {
        console.warn("Unexpected API response structure:", response.data);
        setMedia([]);
      }
    } catch (error) {
      console.error(
        "Error fetching media:",
        error.response?.data || error.message
      );
      setMedia([]);
    }
  };

  const onMediaUpdate = (updatedMedia) => {
    setMedia(updatedMedia);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);

    if (type === "headshot") {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setHeadshot(file);
      setFormData((prev) => ({ ...prev, headshot: fileUrl }));
    }

    if (type === "image") {
      setImage((prev) => [...prev, ...files]);
    } else if (type === "video") {
      setVideo((prev) => [...prev, ...files]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Entertainer Name is required";

    if (!formData.type) newErrors.type = "Entertainer Type is required";

    if (!formData.phone1) newErrors.phone1 = "Phone Number 1 is required";
    else if (!/^\d+$/.test(formData.phone1))
      newErrors.phone1 = "Phone Number 1 must be digits only";

    if (!formData.performanceRole)
      newErrors.performanceRole = "Performance Role is required";

    if (!formData.availability)
      newErrors.availability = "Availability is required";

    if (!formData.vaccinated)
      newErrors.vaccinated = "Vaccination status is required";

    return newErrors;
  };

  // const mediaUpload = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("token");
  
  //   try {
  //     if (!headshot && image.length === 0 && video.length === 0) {
  //       toast.error("Please select media to upload.");
  //       return;
  //     }
  
  //     setUploading(true); 
  
  //     let updatedHeadshotUrl = null; 
  
  //     if (media.length > 0) {
  //       await Promise.all(
  //         media.map(async (item) => {
  //           if (
  //             (item.type === "headshot" && !headshot) ||
  //             (item.type === "image" && image.length === 0) ||
  //             (item.type === "video" && video.length === 0)
  //           ) {
  //             return; 
  //           }
  
  //           const updateFormData = new FormData();
  //           if (item.type === "headshot" && headshot) {
  //             updateFormData.append("headshot", headshot);
  //           } else if (item.type === "image" && image.length > 0) {
  //             image.forEach((img) => updateFormData.append("image", img)); 
  //           } else if (item.type === "video" && video.length > 0) {
  //             video.forEach((vid) => updateFormData.append("video", vid));
  //           }
  
  //           try {
  //             const updateResponse = await axios.put(
  //               `${import.meta.env.VITE_API_URL}media/${item.id}`,
  //               updateFormData,
  //               {
  //                 headers: {
  //                   Authorization: `Bearer ${token}`,
  //                 },
  //               }
  //             );
  
  //             if (item.type === "headshot") {
  //               updatedHeadshotUrl = updateResponse.data.headshotUrl;
  //             }
  //           } catch (err) {
  //             console.error(`Failed to update ${item.type}:`, err.response?.data || err);
  //             toast.error(`Failed to update ${item.type}.`);
  //           }
  //         })
  //       );
  
  //       toast.success("Media updated successfully!");
  //     }
  
  //     if (headshot || image.length > 0 || video.length > 0) {
  //       const mediaFormData = new FormData();
  //       if (headshot) mediaFormData.append("headshot", headshot);
  //       image.forEach((img) => mediaFormData.append("image", img));
  //       video.forEach((vid) => mediaFormData.append("video", vid));
  
  //       try {
  //         const mediaUploadResponse = await axios.post(
  //           `${import.meta.env.VITE_API_URL}media/uploads`,
  //           mediaFormData,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  
  //         if (mediaUploadResponse.status === 201) {
  //           const { headshotUrl, imagesUrls, videosUrls } = mediaUploadResponse.data;
  //           updatedHeadshotUrl = headshotUrl;
  
  //           setFormData((prev) => ({
  //             ...prev,
  //             headshot: headshotUrl || prev.headshot,
  //             image: imagesUrls || prev.image,
  //             video: videosUrls || prev.video,
  //           }));
  
  //           toast.success("Media uploaded successfully!");
  //         }
  //       } catch (error) {
  //         console.error("Error uploading new media:", error.response?.data || error);
  //         toast.error(error.response?.data?.message || "Failed to upload media.");
  //       }
  //     }
  
  //     await fetchMedia(); 
  
  //     if (updatedHeadshotUrl) {
  //       setFormData((prev) => ({
  //         ...prev,
  //         headshot: updatedHeadshotUrl,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Error in mediaUpload:", error.response?.data || error);
  //     toast.error(error.response?.data?.message || "Failed to process media.");
  //   } finally {
  //     setUploading(false); 
  //   }
  // };
  
  const mediaUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    try {
      if (!headshot && image.length === 0 && video.length === 0) {
        toast.error("Please select media to upload.");
        return;
      }
  
      setUploading(true);
  
      let updatedHeadshotUrl = null;
      let newImages = [];
      let newVideos = [];
  
      if (media.length > 0) {
        // ✅ Update existing media
        const updatePromises = media.map(async (item) => {
          if (
            (item.type === "headshot" && !headshot) ||
            (item.type === "image" && image.length === 0) ||
            (item.type === "video" && video.length === 0)
          ) {
            return null;
          }
  
          const updateFormData = new FormData();
          if (item.type === "headshot" && headshot) {
            updateFormData.append("headshot", headshot);
          } else if (item.type === "image" && image.length > 0) {
            image.forEach((img) => updateFormData.append("images", img));
          } else if (item.type === "video" && video.length > 0) {
            video.forEach((vid) => updateFormData.append("videos", vid));
          }
  
          try {
            const response = await axios.put(
              `${import.meta.env.VITE_API_URL}media/${item.id}`,
              updateFormData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (item.type === "headshot") {
              updatedHeadshotUrl = response.data.headshotUrl;
            }
          } catch (err) {
            console.error(`Failed to update ${item.type}:`, err.response?.data || err);
            toast.error(`Failed to update ${item.type}.`);
          }
        });
  
        await Promise.all(updatePromises);
        toast.success("Media updated successfully!");
      } else {
        // ✅ Post new media (only if media is empty)
        const uploadFormData = new FormData();
        if (headshot) uploadFormData.append("headshot", headshot);
        image.forEach((img) => uploadFormData.append("images", img));
        video.forEach((vid) => uploadFormData.append("videos", vid));
  
        try {
          const uploadResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}media/uploads`,
            uploadFormData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          if (uploadResponse.status === 201) {
            const { headshotUrl, imagesUrls, videosUrls } = uploadResponse.data;
            updatedHeadshotUrl = headshotUrl;
            newImages = imagesUrls;
            newVideos = videosUrls;
            toast.success("Media uploaded successfully!");
          }
        } catch (error) {
          console.error("Error uploading new media:", error.response?.data || error);
          toast.error(error.response?.data?.message || "Failed to upload media.");
        }
      }
  
      // ✅ Update UI with new media
      setFormData((prev) => ({
        ...prev,
        headshot: updatedHeadshotUrl || prev.headshot,
        image: newImages.length > 0 ? newImages : prev.image,
        video: newVideos.length > 0 ? newVideos : prev.video,
      }));
  
      await fetchMedia(); // Refresh media list once
    } catch (error) {
      console.error("Error in mediaUpload:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to process media.");
    } finally {
      setUploading(false);
    }
  };
  
  
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", formData);

    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }

    const userData = {};
    const entertainerData = {
      name: formData.name,
      category: Number(formData.category) || null,
      specific_category: Number(formData.specific_category) || null,
      bio: formData.bio,
      phone1: formData.phone1,
      phone2: formData.phone2,
      performanceRole: formData.performanceRole,
      availability: formData.availability,
      vaccinated: formData.vaccinated,
      pricePerEvent: Number(formData.pricePerEvent) || null,
      socialLinks: formData.socialLinks,
      status: localStorage.getItem("status"),
    };

    const entertainerId = localStorage.getItem("entertainerId");
    console.log(entertainerId);
    if (isEditing && !entertainerId) {
      toast.error("Entertainer ID is missing.");
      return;
    }

    try {
      if (isEditing) {
        console.log("Updating entertainer with ID:", entertainerId);
        const updateResponse = await axios.patch(
          `${import.meta.env.VITE_API_URL}entertainers/${entertainerId}`,
          entertainerData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Update response:", updateResponse);
        if (updateResponse.status === 200) {
          toast.success("Entertainer updated successfully!");
        } else {
          toast.error("Failed to update entertainer.");
        }
      } else {
        console.log("Creating new entertainer profile");
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}entertainers`,
          entertainerData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.status === 201 ) {
          toast.success("Entertainer profile created successfully!");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
      toast.error("Failed to submit the form.");
    }
  };

  return (
    <>
      <DashLayoutEnter
        title="Profile"
        description="View and manage your profile"
      >
        <div className="container d-flex">
          <EnterAccountSidebar/>
          <EnterProfileContainer
                formData={formData}
                errors={errors}
                headshot={headshot}
                setHeadshot={setHeadshot} 
                categories={categories}
                subcategories={subcategories}
                performanceRole={performanceRole}
                options={options}
                isEditing={isEditing}
                handleInputChange={handleInputChange}
                handleCategoryChange={handleCategoryChange}
                handleSubCategoryChange={handleSubCategoryChange}
                fetchMedia={fetchMedia}
                mediaProp={media}
                mediaUpload={mediaUpload}
                onMediaUpdate={(updatedMedia) => setMedia(updatedMedia)}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}/>
        </div>
        {/* <div className="container-fluid d-flex flex-column min-vh-100 mt-5">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="container mt-5">
            <div className="row justify-content-center mb-4 mt-3">
              <MediaUpload
                handleFileChange={handleFileChange}
                handleDeleteHeadshot={handleDeleteHeadshot}
                handleDeleteImage={handleDeleteImage}
                handleDeleteVideo={handleDeleteVideo}
                headshot={headshot}
                image={image}
                video={video}
                fetchMedia={fetchMedia}
                mediaProp={media}
                mediaUpload={mediaUpload}
                onMediaUpdate={(updatedMedia) => setMedia(updatedMedia)}
              />

              <EntertainerDetailsForm
                formData={formData}
                errors={errors}
                categories={categories}
                subcategories={subcategories}
                performanceRole={performanceRole}
                options={options}
                isEditing={isEditing}
                handleInputChange={handleInputChange}
                handleCategoryChange={handleCategoryChange}
                handleSubCategoryChange={handleSubCategoryChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div> */}
      </DashLayoutEnter>
    </>
  );
}
