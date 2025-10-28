async function logout() {
  const confirmLogout = await Swal.fire({
    title: 'Logout?',
    text: 'Are you sure you want to log out?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, logout',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  });

  if (confirmLogout.isConfirmed) {
    // Clear session storage
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('applicant_id');
    sessionStorage.removeItem('user_role');
    sessionStorage.removeItem('user_name');

    // Optional feedback
    await Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have been logged out successfully.',
      timer: 1500,
      showConfirmButton: false
    });

    // Redirect to login page
    window.location.href = '/login';
  }
}