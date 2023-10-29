import { useEffect, useState } from 'react';
import { LogoutButton } from '../../components/LogoutButtonComponent';
import { getCurrentUser, getAvatarUrl, updateAvatar } from '../../api/users.api';
import { Avatar, Typography, CircularProgress, Box, styled } from '@mui/material';

const ProfileContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'auto',
  padding: '20px',
  boxSizing: 'border-box',
});

const StyledAvatar = styled(Avatar)({
  width: '100px',
  height: '100px',
  marginBottom: '10px',
});

const UsernameTypography = styled(Typography)({
  marginBottom: '20px',
});

export function ProfilePage() {
  const [data, setData] = useState({ loading: true, error: null, user: null, avatarUrl: null });
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarKey, setAvatarKey] = useState(Date.now());  // Nuevo estado

  useEffect(() => {
    const fetchUserAndAvatar = async () => {
      try {
        const userData = await getCurrentUser();
        const avatarRedirectUrl = await getAvatarUrl();
        setData({ loading: false, user: userData, avatarUrl: avatarRedirectUrl });
      } catch (err) {
        setData({ loading: false, error: 'Failed to fetch user data or avatar.' });
      }
    };

    fetchUserAndAvatar();
  }, []);

  const { loading, error, user, avatarUrl } = data;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const updatedAvatarUrl = await updateAvatar(selectedFile);
      setData(prevData => ({ ...prevData, avatarUrl: updatedAvatarUrl }));
      setAvatarKey(Date.now());  // Forzar la actualización del avatar
    }
  };
  
  if (loading) {
    return (
      <ProfileContainer>
        <CircularProgress />
      </ProfileContainer>
    );
  }

  if (error) {
    return (
      <ProfileContainer>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </ProfileContainer>
    );
  }

  if (!user || !avatarUrl) {
    return null;
  }

  const { username } = user;

  return (
    <ProfileContainer>
      <StyledAvatar src={avatarUrl} alt={`${username}'s avatar`} key={avatarKey} />
      <UsernameTypography variant="h5">{username}</UsernameTypography>
      <form onSubmit={e => e.preventDefault()}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUploadClick}>Upload Avatar</button>
      </form>
      <LogoutButton />
    </ProfileContainer>
  );
}
