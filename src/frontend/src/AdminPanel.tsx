import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Principal } from "@icp-sdk/core/principal";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  Crown,
  Loader2,
  LogOut,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { UserRole } from "./backend.d";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import {
  useAssignUserRole,
  useGetAllReservations,
  useIsCallerAdmin,
} from "./hooks/useQueries";

function PalaceSVG() {
  return (
    <svg
      role="img"
      aria-label="Kolkata Rajbari palace logo"
      width="40"
      height="28"
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="18"
        width="40"
        height="12"
        rx="1"
        fill="#C9A24E"
        opacity="0.9"
      />
      <rect
        x="8"
        y="12"
        width="32"
        height="8"
        rx="1"
        fill="#C9A24E"
        opacity="0.8"
      />
      <rect
        x="14"
        y="7"
        width="20"
        height="7"
        rx="1"
        fill="#C9A24E"
        opacity="0.85"
      />
      <rect x="20" y="3" width="8" height="6" rx="1" fill="#C9A24E" />
      <path d="M24 1 L27 5 L21 5 Z" fill="#C9A24E" />
      <rect
        x="6"
        y="20"
        width="4"
        height="10"
        rx="0.5"
        fill="#8B6914"
        opacity="0.6"
      />
      <rect
        x="38"
        y="20"
        width="4"
        height="10"
        rx="0.5"
        fill="#8B6914"
        opacity="0.6"
      />
      <rect
        x="20"
        y="22"
        width="8"
        height="8"
        rx="0.5"
        fill="#8B6914"
        opacity="0.6"
      />
      {[10, 18, 26, 34].map((x) => (
        <ellipse
          key={x}
          cx={x + 2}
          cy="17"
          rx="2"
          ry="2.5"
          fill="#C9A24E"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 justify-center my-3">
      <div className="h-px bg-gold flex-1 max-w-[60px] opacity-60" />
      <svg
        role="img"
        aria-label="ornamental star"
        width="12"
        height="12"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M8 1 L9.5 6.5 L15 8 L9.5 9.5 L8 15 L6.5 9.5 L1 8 L6.5 6.5 Z"
          fill="#C9A24E"
          opacity="0.8"
        />
      </svg>
      <div className="h-px bg-gold flex-1 max-w-[60px] opacity-60" />
    </div>
  );
}

function LoginScreen() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-parchment filigree-bg flex flex-col items-center justify-center px-6"
    >
      <div className="bg-parchment-light border border-gold/40 rounded-xl shadow-royal p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-maroon/10 border-2 border-gold/40 flex items-center justify-center">
            <Crown size={28} className="text-gold" />
          </div>
        </div>
        <PalaceSVG />
        <h1 className="font-serif text-2xl font-bold text-brown mt-3 mb-1">
          Admin Portal
        </h1>
        <p className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-1">
          Kolkata Rajbari
        </p>
        <GoldDivider />
        <p className="font-body text-sm text-brown-medium mb-8 leading-relaxed">
          Sign in with your Internet Identity to access the admin panel and
          manage reservations.
        </p>
        <Button
          data-ocid="admin.primary_button"
          onClick={() => login()}
          disabled={isLoggingIn}
          className="w-full bg-gold hover:bg-gold-dark text-brown font-body font-bold text-sm tracking-[0.12em] uppercase py-3 h-auto rounded-lg shadow-gold transition-all"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" /> Sign In with Internet Identity
            </>
          )}
        </Button>
        <div className="mt-6">
          <Link
            to="/"
            data-ocid="admin.link"
            className="inline-flex items-center gap-1.5 font-body text-xs text-brown-medium hover:text-gold transition-colors"
          >
            <ChevronLeft size={14} />
            Back to main site
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function AccessDenied() {
  const { clear, identity } = useInternetIdentity();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6"
    >
      <div className="bg-parchment-light border border-gold/40 rounded-xl shadow-royal p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-100 border-2 border-red-300 flex items-center justify-center">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
        </div>
        <h2 className="font-serif text-2xl font-bold text-brown mb-2">
          Access Denied
        </h2>
        <GoldDivider />
        <p className="font-body text-sm text-brown-medium mb-4 leading-relaxed">
          Your account does not have administrator privileges. Please contact
          the restaurant owner to be granted access.
        </p>
        {identity && (
          <div className="bg-parchment-dark rounded-lg p-3 mb-6">
            <p className="font-body text-xs text-brown-medium mb-1">
              Your Principal ID:
            </p>
            <p className="font-mono text-xs text-brown break-all">
              {identity.getPrincipal().toString()}
            </p>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <Button
            data-ocid="admin.primary_button"
            onClick={() => clear()}
            variant="outline"
            className="w-full border-gold/40 text-brown font-body text-sm hover:bg-gold/10"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
          <Link to="/" data-ocid="admin.link">
            <Button
              variant="ghost"
              className="w-full font-body text-sm text-brown-medium hover:text-gold"
            >
              <ChevronLeft size={14} className="mr-1" /> Back to main site
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function ReservationsTable() {
  const { data: reservations, isLoading, isError } = useGetAllReservations();

  if (isLoading) {
    return (
      <div data-ocid="admin.reservations.loading_state" className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        data-ocid="admin.reservations.error_state"
        className="text-center py-10 text-red-500 font-body"
      >
        Failed to load reservations. Please refresh the page.
      </div>
    );
  }

  if (!reservations || reservations.length === 0) {
    return (
      <div
        data-ocid="admin.reservations.empty_state"
        className="text-center py-16"
      >
        <CalendarDays size={40} className="text-gold/40 mx-auto mb-3" />
        <p className="font-body text-brown-medium text-sm">
          No reservations yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className="overflow-x-auto rounded-lg border border-gold/20"
      data-ocid="admin.reservations.table"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-maroon/5 hover:bg-maroon/5 border-b border-gold/20">
            <TableHead className="font-body text-xs tracking-[0.12em] uppercase text-brown font-bold">
              #
            </TableHead>
            <TableHead className="font-body text-xs tracking-[0.12em] uppercase text-brown font-bold">
              Guest Name
            </TableHead>
            <TableHead className="font-body text-xs tracking-[0.12em] uppercase text-brown font-bold">
              Date
            </TableHead>
            <TableHead className="font-body text-xs tracking-[0.12em] uppercase text-brown font-bold">
              Time
            </TableHead>
            <TableHead className="font-body text-xs tracking-[0.12em] uppercase text-brown font-bold">
              Guests
            </TableHead>
            <TableHead className="font-body text-xs tracking-[0.12em] uppercase text-brown font-bold">
              Special Requests
            </TableHead>
            <TableHead className="font-body text-xs tracking-[0.12em] uppercase text-brown font-bold">
              Submitted
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((res, i) => (
            <TableRow
              key={String(res.id)}
              data-ocid={`admin.reservations.row.${i + 1}`}
              className="border-b border-gold/10 hover:bg-gold/5"
            >
              <TableCell className="font-body text-xs text-brown-medium">
                {i + 1}
              </TableCell>
              <TableCell className="font-body text-sm text-brown font-medium">
                {res.guestName}
              </TableCell>
              <TableCell className="font-body text-sm text-brown">
                {res.date}
              </TableCell>
              <TableCell className="font-body text-sm text-brown">
                {res.time}
              </TableCell>
              <TableCell className="font-body text-sm text-brown">
                {String(res.numberOfGuests)}
              </TableCell>
              <TableCell className="font-body text-sm text-brown-medium max-w-[200px] truncate">
                {res.specialRequests || (
                  <span className="text-brown-medium/50 italic">None</span>
                )}
              </TableCell>
              <TableCell className="font-body text-xs text-brown-medium whitespace-nowrap">
                {new Date(
                  Number(res.submittedAt / 1_000_000n),
                ).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function UserManagement() {
  const [principalInput, setPrincipalInput] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.admin);
  const assignRole = useAssignUserRole();

  const handleAssign = async () => {
    if (!principalInput.trim()) {
      toast.error("Please enter a Principal ID.");
      return;
    }
    try {
      const principal = Principal.fromText(principalInput.trim());
      await assignRole.mutateAsync({ user: principal, role: selectedRole });
      toast.success(`Role "${selectedRole}" assigned successfully.`);
      setPrincipalInput("");
    } catch {
      toast.error("Invalid Principal ID or failed to assign role.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-4 items-end">
        <div className="sm:col-span-2 space-y-1.5">
          <label
            htmlFor="principal-input"
            className="font-body text-xs tracking-[0.1em] uppercase text-brown-light font-semibold"
          >
            Principal ID
          </label>
          <Input
            id="principal-input"
            data-ocid="admin.user_management.input"
            placeholder="e.g. aaaaa-aaaaa-aaaaa-aaaaa-cai"
            value={principalInput}
            onChange={(e) => setPrincipalInput(e.target.value)}
            className="bg-white border-gold/30 focus:border-gold font-mono text-brown text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <span className="font-body text-xs tracking-[0.1em] uppercase text-brown-light font-semibold">
            Role
          </span>
          <Select
            value={selectedRole}
            onValueChange={(v) => setSelectedRole(v as UserRole)}
          >
            <SelectTrigger
              data-ocid="admin.user_management.select"
              className="bg-white border-gold/30 focus:border-gold font-body text-brown"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={UserRole.admin} className="font-body">
                Admin
              </SelectItem>
              <SelectItem value={UserRole.user} className="font-body">
                User
              </SelectItem>
              <SelectItem value={UserRole.guest} className="font-body">
                Guest
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        data-ocid="admin.user_management.submit_button"
        onClick={handleAssign}
        disabled={assignRole.isPending || !principalInput.trim()}
        className="bg-gold hover:bg-gold-dark text-brown font-body font-bold text-xs tracking-[0.12em] uppercase px-8 py-2.5 h-auto rounded-lg shadow-gold transition-all"
      >
        {assignRole.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Assigning...
          </>
        ) : (
          "ASSIGN ROLE"
        )}
      </Button>
      {assignRole.isSuccess && (
        <p
          data-ocid="admin.user_management.success_state"
          className="text-xs font-body text-green-700"
        >
          ✓ Role assigned successfully.
        </p>
      )}
      {assignRole.isError && (
        <p
          data-ocid="admin.user_management.error_state"
          className="text-xs font-body text-red-600"
        >
          ✗ Failed to assign role. Please check the Principal ID.
        </p>
      )}
    </div>
  );
}

export default function AdminPanel() {
  const { identity, clear, isInitializing } = useInternetIdentity();
  const isLoggedIn = !!identity;

  const { data: isAdmin, isLoading: checkingAdmin } = useIsCallerAdmin();

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div
          data-ocid="admin.loading_state"
          className="flex flex-col items-center gap-3"
        >
          <Loader2 size={32} className="animate-spin text-gold" />
          <p className="font-body text-sm text-brown-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  if (checkingAdmin) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div
          data-ocid="admin.loading_state"
          className="flex flex-col items-center gap-3"
        >
          <Loader2 size={32} className="animate-spin text-gold" />
          <p className="font-body text-sm text-brown-medium">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen bg-parchment font-body">
      {/* Admin Header */}
      <header
        className="bg-maroon border-b-2 border-gold/40 shadow-royal"
        data-ocid="admin.panel"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              data-ocid="admin.link"
              className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors"
            >
              <ChevronLeft size={16} />
              <span className="font-body text-xs tracking-[0.1em] uppercase">
                Main Site
              </span>
            </Link>
            <div className="w-px h-6 bg-gold/30" />
            <div className="flex items-center gap-3">
              <PalaceSVG />
              <div>
                <p className="font-serif text-white font-semibold text-sm leading-none">
                  Kolkata Rajbari
                </p>
                <p className="font-body text-gold text-xs tracking-[0.1em] uppercase mt-0.5">
                  Admin Portal
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="font-body text-xs text-white/50">Signed in as</p>
              <p className="font-mono text-xs text-gold/80 max-w-[180px] truncate">
                {identity?.getPrincipal().toString()}
              </p>
            </div>
            <Badge className="bg-gold/20 text-gold border-gold/40 font-body text-xs">
              <Crown size={10} className="mr-1" /> Admin
            </Badge>
            <Button
              data-ocid="admin.close_button"
              onClick={() => clear()}
              variant="outline"
              size="sm"
              className="border-gold/30 text-white/70 hover:text-gold hover:border-gold font-body text-xs tracking-[0.08em] uppercase bg-transparent"
            >
              <LogOut size={14} className="mr-1.5" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Reservations Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
          data-ocid="admin.reservations.section"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center">
              <BookOpen size={18} className="text-gold" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-brown">
                Reservations
              </h2>
              <p className="font-body text-xs text-brown-medium tracking-[0.1em] uppercase">
                All bookings
              </p>
            </div>
          </div>
          <div className="bg-parchment-light border border-gold/20 rounded-xl shadow-card p-6">
            <ReservationsTable />
          </div>
        </motion.section>

        {/* User Management Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          data-ocid="admin.user_management.section"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center">
              <Users size={18} className="text-gold" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-brown">
                User Management
              </h2>
              <p className="font-body text-xs text-brown-medium tracking-[0.1em] uppercase">
                Assign roles by Principal ID
              </p>
            </div>
          </div>
          <div className="bg-parchment-light border border-gold/20 rounded-xl shadow-card p-6">
            <p className="font-body text-sm text-brown-medium mb-5 leading-relaxed">
              Enter a user's Principal ID to assign them a role. Promote trusted
              staff to <strong className="text-brown">Admin</strong> to grant
              full access to this panel.
            </p>
            <UserManagement />
          </div>
        </motion.section>
      </main>

      <footer className="mt-16 border-t border-gold/20 bg-maroon">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/50">
            © {new Date().getFullYear()} Kolkata Rajbari · Admin Portal
          </p>
          <p className="font-body text-xs text-white/40">
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
