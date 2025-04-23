import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }


    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return navigate("/login");

      try {
        const res = await fetch("http://127.0.0.1:8000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setFormData({
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          address: data.address,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load profile");
        navigate("/login");
      }
    };

    fetchProfile();
  }, []);
  if (!formData) return <div>Loading profile...</div>;




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("access_token");
    const res = await fetch("http://127.0.0.1:8000/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Profile updated!");
      setIsEditing(false);
    } else {
      alert("Update failed.");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("access_token");
    const confirmDelete = confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    const res = await fetch("http://127.0.0.1:8000/api/user/delete", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      alert("Account deleted.");
      localStorage.removeItem("access_token");
      navigate("/register");
    } else {
      alert("Failed to delete account.");
    }
  };

  return (
    <div>
      <h2>Your Profile</h2>

      <div>
        <label>
          Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <br />

        <label>
          Email:
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <br />

        <label>
          Phone:
          <input
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <br />

        <label>
          Address:
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
      </div>

      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
      ) : (
        <>
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      )}

      <br /><br />
      <button onClick={handleDelete} style={{ color: "red" }}>
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
