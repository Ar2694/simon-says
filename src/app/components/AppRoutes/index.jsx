
export default function AppRoutes(props) {
  const { context } = props;
  const { app } = context.state;

  if (app.isLoading) {
    return <LoaderView />;
  }


  ret

  if (!app.isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*"  element={<LoginPage />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/edit-user" element={<EditUserPageV2 />} />
        <Route path="*"  element={<HomePage />} />
      </Routes>
    )
  }
}
