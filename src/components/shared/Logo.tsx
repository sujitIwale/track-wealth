import Typography from "../common/Typography/Typography";

const Logo = ({ isMobile }: { isMobile?: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/public/assets/logos/expenses.png"
        alt="Logo"
        className="w-8 h-8"
      />
      {!isMobile ? <Typography variant="h6">Wealth AI</Typography> : null}
    </div>
  );
};

export default Logo;
