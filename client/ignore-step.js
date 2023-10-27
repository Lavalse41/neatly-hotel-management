const VERCEL_ENV = process.env.VERCEL_ENV;

if (VERCEL_ENV === "production") {
  // Proceed with the build
  console.log("✅ - Build can proceed");
  process.exit(1); // Exit with code 1 to allow the build
} else {
  // Don't build
  console.log("🛑 - Build cancelled");
  process.exit(0); // Exit with code 0 to skip the build
}
