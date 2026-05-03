import { useEffect, useState, useMemo } from "react";
import {
  Search, Filter, X, ChevronRight, ChevronDown, Check, Plus, Trash2, Settings,
  AlertCircle, Info, CheckCircle2, AlertTriangle, Loader2, Inbox, ArrowUpRight,
  ArrowUp, ArrowDown, MoreHorizontal, Anchor, Ship, Package, Globe,
  Calendar as CalendarIcon, UploadCloud, FileText, Command as CommandIcon,
  Map, BarChart3, Users, LayoutDashboard, Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, CommandDialog } from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";

const BRAND = {
  lucky: "#1E1450",
  red: "#FF2261",
  green: "#00E68C",
  maverick: "#F5F3F5",
  cinder: "#0F0F19",
};

const SECTIONS = [
  { id: "color", label: "Color" },
  { id: "typography", label: "Type" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Radius" },
  { id: "shadow", label: "Shadow" },
  { id: "buttons", label: "Buttons" },
  { id: "forms", label: "Forms" },
  { id: "cards", label: "Cards" },
  { id: "tables", label: "Tables" },
  { id: "navigation", label: "Navigation" },
  { id: "feedback", label: "Feedback" },
  { id: "overlays", label: "Overlays" },
  { id: "charts", label: "Data Display" },
  { id: "layouts", label: "Page Layouts" },
  { id: "patterns", label: "UX Patterns" },
];

function useActiveSection() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function SectionHeader({ index, eyebrow, title, lede }: { index: string; eyebrow: string; title: string; lede: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-10">
      <div className="md:col-span-2">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
          {index} — {eyebrow}
        </div>
        <h2 className="text-3xl md:text-4xl tracking-tight" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>
          {title}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
        {lede}
      </p>
    </div>
  );
}

function Subsection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-12 last:mb-0">
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function Swatch({ name, hex, role, dark = false }: { name: string; hex: string; role: string; dark?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      className="cursor-pointer group text-left rounded-xl overflow-hidden bg-card transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="h-32 relative flex items-end p-4" style={{ backgroundColor: hex }}>
        <span className="text-[11px]" style={{ color: dark ? BRAND.maverick : "rgba(15,15,25,0.65)", fontFamily: "Inter, sans-serif" }}>
          {role}
        </span>
        <span className="absolute top-3 right-3 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity px-2 py-0.5 rounded-full bg-background/80 text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
          {copied ? "Copied" : "Copy"}
        </span>
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="text-sm" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>{name}</span>
        <span className="text-xs text-muted-foreground font-mono">{hex}</span>
      </div>
    </button>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-border/30 py-3" style={{ fontFamily: "Inter, sans-serif" }}>
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-sm" style={{ color: BRAND.cinder }}>{value}</span>
    </div>
  );
}

// Sample data for the table demo
const VESSELS = [
  { id: "MV-001", name: "Atlantic Pioneer", port: "Rotterdam", status: "Berthed", eta: "2026-05-04", flag: "NL" },
  { id: "MV-002", name: "Pacific Voyager", port: "Singapore", status: "In Transit", eta: "2026-05-08", flag: "SG" },
  { id: "MV-003", name: "Indian Star", port: "Jebel Ali", status: "Berthed", eta: "2026-05-03", flag: "AE" },
  { id: "MV-004", name: "Arctic Explorer", port: "Hamburg", status: "Departed", eta: "2026-05-12", flag: "DE" },
  { id: "MV-005", name: "Caribbean Trader", port: "Kingston", status: "In Transit", eta: "2026-05-09", flag: "JM" },
  { id: "MV-006", name: "Mediterranean Swift", port: "Algeciras", status: "Berthed", eta: "2026-05-04", flag: "ES" },
  { id: "MV-007", name: "Baltic Carrier", port: "Tallinn", status: "Departed", eta: "2026-05-15", flag: "EE" },
];

function VesselTable() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<{ key: keyof typeof VESSELS[0]; dir: "asc" | "desc" }>({ key: "eta", dir: "asc" });
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const filtered = useMemo(() => {
    let out = VESSELS.filter((v) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || v.name.toLowerCase().includes(q) || v.port.toLowerCase().includes(q) || v.id.toLowerCase().includes(q);
      const matchS = !statusFilter || v.status === statusFilter;
      return matchQ && matchS;
    });
    out = out.slice().sort((a, b) => {
      const dir = sort.dir === "asc" ? 1 : -1;
      return a[sort.key] > b[sort.key] ? dir : -dir;
    });
    return out;
  }, [query, statusFilter, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  const statusColor = (s: string) =>
    s === "Berthed" ? { bg: "rgba(0, 230, 140, 0.12)", color: "#00875a", dot: BRAND.green }
    : s === "In Transit" ? { bg: "rgba(30, 20, 80, 0.10)", color: BRAND.lucky, dot: BRAND.lucky }
    : { bg: "rgba(15, 15, 25, 0.06)", color: "rgba(15,15,25,0.6)", dot: "rgba(15,15,25,0.4)" };

  return (
    <div className="rounded-xl bg-card overflow-hidden">
      {/* Toolbar — search left, filters right (the canonical pattern) */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between px-4 py-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search vessels, ports, IDs…"
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {(["Berthed", "In Transit", "Departed"] as const).map((s) => {
            const active = statusFilter === s;
            return (
              <button
                key={s}
                onClick={() => { setStatusFilter(active ? null : s); setPage(1); }}
                className={`cursor-pointer inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${active ? "active:opacity-90" : "hover:bg-accent active:bg-accent/70"}`}
                style={active ? { backgroundColor: BRAND.lucky, color: BRAND.maverick } : { backgroundColor: "transparent", color: BRAND.cinder, border: "1px solid hsl(var(--border))" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: statusColor(s).dot }} />
                {s}
                {active && <X className="h-3 w-3" />}
              </button>
            );
          })}
          {(query || statusFilter) && (
            <button
              onClick={() => { setQuery(""); setStatusFilter(null); setPage(1); }}
              className="cursor-pointer text-xs text-muted-foreground hover:text-foreground active:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded px-2 py-1 transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="px-4 py-16 text-center">
          <Inbox className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
          <div className="text-sm" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>No vessels match</div>
          <div className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "Inter, sans-serif" }}>Try clearing the filter or searching by port.</div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {([
                { key: "id", label: "ID" },
                { key: "name", label: "Vessel" },
                { key: "port", label: "Port" },
                { key: "status", label: "Status" },
                { key: "eta", label: "ETA" },
              ] as const).map((col) => (
                <TableHead key={col.key} className="text-[11px] uppercase tracking-wider">
                  <button
                    onClick={() => setSort({ key: col.key as keyof typeof VESSELS[0], dir: sort.key === col.key && sort.dir === "asc" ? "desc" : "asc" })}
                    className="cursor-pointer inline-flex items-center gap-1 rounded px-1 -mx-1 py-0.5 text-muted-foreground hover:text-foreground active:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                  >
                    {col.label}
                    {sort.key === col.key && (sort.dir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                  </button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((v) => {
              const c = statusColor(v.status);
              return (
                <TableRow key={v.id} className="cursor-pointer hover:bg-muted/40 transition-colors">
                  <TableCell className="font-mono text-xs text-muted-foreground">{v.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Ship className="h-4 w-4" style={{ color: BRAND.lucky }} />
                      <span style={{ fontFamily: "Inter, sans-serif" }}>{v.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{v.port}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs" style={{ backgroundColor: c.bg, color: c.color }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.dot }} />
                      {v.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{v.eta}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <div className="flex items-center justify-between px-4 py-3 text-xs text-muted-foreground">
        <span style={{ fontFamily: "Inter, sans-serif" }}>
          Showing {visible.length} of {filtered.length}
        </span>
        <Pagination className="m-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage(Math.max(1, page - 1))} className="cursor-pointer" />
            </PaginationItem>
            {Array.from({ length: pageCount }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)} className="cursor-pointer">{i + 1}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => setPage(Math.min(pageCount, page + 1))} className="cursor-pointer" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

// Tiny inline SVG charts so the page stays self-contained (no extra deps)
function LineChartDemo() {
  const data = [12, 18, 14, 22, 19, 26, 24, 30, 28, 36, 32, 41];
  const max = Math.max(...data);
  const w = 320, h = 100, pad = 6;
  const points = data.map((v, i) => `${pad + (i * (w - pad * 2)) / (data.length - 1)},${h - pad - ((v / max) * (h - pad * 2))}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <polyline fill="none" stroke={BRAND.lucky} strokeWidth="2" points={points} />
      <polygon fill={BRAND.lucky} fillOpacity="0.08" points={`${pad},${h - pad} ${points} ${w - pad},${h - pad}`} />
    </svg>
  );
}

function BarChartDemo() {
  const data = [40, 65, 30, 80, 55, 70, 45];
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-2 h-[100px]">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-t-md transition-all hover:opacity-80 cursor-pointer" style={{ height: `${(v / max) * 100}%`, backgroundColor: i === 3 ? BRAND.green : BRAND.lucky }} />
      ))}
    </div>
  );
}

function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const ports = [
    { v: "rotterdam", l: "Rotterdam, NL" },
    { v: "singapore", l: "Singapore, SG" },
    { v: "jebel-ali", l: "Jebel Ali, AE" },
    { v: "hamburg", l: "Hamburg, DE" },
    { v: "algeciras", l: "Algeciras, ES" },
    { v: "kingston", l: "Kingston, JM" },
  ];
  const selected = ports.find((p) => p.v === value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-expanded={open}
          className="cursor-pointer w-full inline-flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span className={selected ? "" : "text-muted-foreground"}>
            {selected ? selected.l : "Search & pick a port…"}
          </span>
          <ChevronDown className="h-4 w-4 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] p-0">
        <Command>
          <CommandInput placeholder="Type to filter…" />
          <CommandList>
            <CommandEmpty>No port found.</CommandEmpty>
            <CommandGroup>
              {ports.map((p) => (
                <CommandItem key={p.v} value={p.l} onSelect={() => { setValue(p.v); setOpen(false); }} className="cursor-pointer">
                  <Check className={`h-4 w-4 ${value === p.v ? "opacity-100" : "opacity-0"}`} />
                  {p.l}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function DatePickerDemo() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 4, 8));
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="cursor-pointer w-full inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <CalendarIcon className="h-4 w-4 opacity-60" />
          <span className={date ? "" : "text-muted-foreground"}>
            {date ? date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Pick a date"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={(d) => { setDate(d); setOpen(false); }} />
      </PopoverContent>
    </Popover>
  );
}

function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const [over, setOver] = useState(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setOver(false);
    setFiles(Array.from(e.dataTransfer.files));
  };
  return (
    <div>
      <label
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={`cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2`}
        style={over ? { borderColor: BRAND.lucky, backgroundColor: "rgba(30,20,80,0.04)" } : { borderColor: "hsl(var(--border))" }}
      >
        <UploadCloud className="h-7 w-7 mb-2" style={{ color: BRAND.lucky }} />
        <div className="text-sm" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>Drop manifest files here</div>
        <div className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "Inter, sans-serif" }}>or click to browse · CSV, XLSX up to 10 MB</div>
        <input type="file" multiple className="sr-only" onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
      </label>
      {files.length > 0 && (
        <ul className="mt-3 space-y-1">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-muted/40" style={{ fontFamily: "Inter, sans-serif" }}>
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="truncate">{f.name}</span>
              <span className="ml-auto text-muted-foreground font-mono">{Math.max(1, Math.round(f.size / 1024))} KB</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen((o) => !o); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground hover:bg-accent active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <Search className="h-4 w-4" />
        <span>Search anything…</span>
        <span className="ml-6 inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] font-mono">⌘K</span>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Navigate">
            <CommandItem className="cursor-pointer"><LayoutDashboard className="h-4 w-4" />Dashboard <CommandShortcut>G D</CommandShortcut></CommandItem>
            <CommandItem className="cursor-pointer"><Ship className="h-4 w-4" />Vessels <CommandShortcut>G V</CommandShortcut></CommandItem>
            <CommandItem className="cursor-pointer"><Map className="h-4 w-4" />Ports <CommandShortcut>G P</CommandShortcut></CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem className="cursor-pointer"><Plus className="h-4 w-4" />New voyage</CommandItem>
            <CommandItem className="cursor-pointer"><Settings className="h-4 w-4" />Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function MiniSidebarDemo() {
  const items = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Ship, label: "Vessels" },
    { icon: Map, label: "Ports" },
    { icon: Package, label: "Cargo" },
    { icon: Users, label: "Crew" },
    { icon: BarChart3, label: "Reports" },
  ];
  return (
    <div className="rounded-xl bg-card overflow-hidden border border-border/30">
      <div className="grid grid-cols-[180px_1fr] min-h-[260px]">
        <aside className="border-r border-border/30 p-3 flex flex-col gap-0.5 bg-muted/30">
          <div className="px-2 py-2 text-[10px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Workspace</div>
          {items.map((it) => (
            <button
              key={it.label}
              className={`cursor-pointer flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors ${it.active ? "" : "text-muted-foreground"}`}
              style={it.active ? { backgroundColor: "rgba(30,20,80,0.08)", color: BRAND.lucky } : {}}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </button>
          ))}
        </aside>
        <main className="p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Dashboard</div>
          <div className="text-2xl tracking-tight" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>Marine operations</div>
          <p className="text-sm text-muted-foreground mt-2" style={{ fontFamily: "Inter, sans-serif" }}>Side nav left, content right. Nav items use the canonical four-state interactive class.</p>
        </main>
      </div>
    </div>
  );
}

function DonutChartDemo() {
  const segments = [
    { label: "Berthed", value: 45, color: BRAND.green },
    { label: "Transit", value: 30, color: BRAND.lucky },
    { label: "Departed", value: 25, color: BRAND.red },
  ];
  const total = segments.reduce((a, b) => a + b.value, 0);
  let acc = 0;
  const r = 36, c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 100 100" className="w-[100px] h-[100px] -rotate-90">
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const dasharray = `${len} ${c - len}`;
          const offset = -((acc / total) * c);
          acc += s.value;
          return <circle key={i} cx="50" cy="50" r={r} fill="none" stroke={s.color} strokeWidth="14" strokeDasharray={dasharray} strokeDashoffset={offset} />;
        })}
      </svg>
      <div className="space-y-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
            <span style={{ color: BRAND.cinder }}>{s.label}</span>
            <span className="text-muted-foreground">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DesignSystem() {
  const active = useActiveSection();
  const [progress, setProgress] = useState(64);

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => (p >= 96 ? 32 : p + 4)), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-[calc(100vh-3.5rem)]" style={{ backgroundColor: BRAND.maverick }}>
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:py-24">

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-8 text-xs" style={{ backgroundColor: "rgba(0, 230, 140, 0.12)", color: "#006d4a", fontFamily: "Inter, sans-serif" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: BRAND.green }} />
                v1.0 · Design system
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]" style={{ fontFamily: "Pilat Demi" }}>
                <span style={{ color: BRAND.cinder }}>DP World.</span>{" "}
                <span style={{ color: BRAND.lucky, fontStyle: "italic" }}>Built with intent.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base md:text-lg text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                Indigo leads. Coral warns. Green reassures. A focused palette and an opinionated component set so every Marine Services app feels like one product.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href="#color" className="cursor-pointer inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" style={{ backgroundColor: BRAND.lucky, color: BRAND.maverick, fontFamily: "Inter, sans-serif" }}>
                  <Anchor className="h-4 w-4" />
                  Tour the system
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#patterns" className="cursor-pointer inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border border-border hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" style={{ color: BRAND.cinder, fontFamily: "Inter, sans-serif" }}>
                  See UX patterns
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-6">
              <MetaRow label="Type" value="Pilat Demi · Inter" />
              <MetaRow label="Primary" value="Lucky Point #1E1450" />
              <MetaRow label="Accent" value="Radical Red · Caribbean Green" />
              <MetaRow label="Components" value="14 sections" />
              <MetaRow label="Spec" value="Single-page · scrollable" />
              <MetaRow label="Updated" value="May 2026" />
              <div className="mt-4 rounded-lg p-3" style={{ backgroundColor: "rgba(255, 34, 97, 0.06)", border: "1px solid rgba(255, 34, 97, 0.2)" }}>
                <div className="text-[11px] uppercase tracking-widest mb-1" style={{ color: BRAND.red, fontFamily: "Inter, sans-serif" }}>Template note</div>
                <div className="text-xs leading-relaxed" style={{ color: BRAND.cinder, fontFamily: "Inter, sans-serif" }}>
                  New apps can delete <code className="font-mono text-[11px]">src/pages/design-system.tsx</code> and the matching route in <code className="font-mono text-[11px]">App.tsx</code> after copying.
                </div>
              </div>
            </div>
          </div>

          {/* Layout: content + sticky nav */}
          <div className="mt-24 grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-12">
            <div className="min-w-0">

              {/* COLOR */}
              <section id="color" className="scroll-mt-24">
                <SectionHeader index="01" eyebrow="Color" title="Colors with conviction." lede="Five official colors. No tints, no remixing. Indigo carries action; coral and green do the talking when something needs attention." />
                <Subsection label="Brand">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    <Swatch name="Lucky Point" hex={BRAND.lucky} role="Primary action · headlines" dark />
                    <Swatch name="Radical Red" hex={BRAND.red} role="Alert · destructive" dark />
                    <Swatch name="Caribbean Green" hex={BRAND.green} role="Success · positive state" />
                    <Swatch name="Maverick" hex={BRAND.maverick} role="Light surface · text on dark" />
                    <Swatch name="Cinder" hex={BRAND.cinder} role="Body text · dark surface" dark />
                  </div>
                </Subsection>
                <Subsection label="Semantic surfaces (opacity-derived)">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { name: "Indigo soft", hex: "rgba(30,20,80,0.08)", role: "Subtle indigo wash" },
                      { name: "Indigo edge", hex: "rgba(30,20,80,0.15)", role: "Indigo border" },
                      { name: "Coral soft", hex: "rgba(255,34,97,0.08)", role: "Alert wash" },
                      { name: "Green soft", hex: "rgba(0,230,140,0.12)", role: "Success wash" },
                    ].map((s) => (
                      <div key={s.name} className="rounded-xl bg-card overflow-hidden">
                        <div className="h-20" style={{ backgroundColor: s.hex }} />
                        <div className="px-3 py-2">
                          <div className="text-xs" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>{s.name}</div>
                          <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{s.hex}</div>
                          <div className="text-[10px] text-muted-foreground mt-1" style={{ fontFamily: "Inter, sans-serif" }}>{s.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Subsection>
                <Subsection label="Status palette (use sparingly, on backgrounds and badges only)">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { l: "Success", bg: "rgba(0,230,140,0.12)", c: "#006d4a", dot: BRAND.green },
                      { l: "Info", bg: "rgba(30,20,80,0.10)", c: BRAND.lucky, dot: BRAND.lucky },
                      { l: "Warning", bg: "rgba(255,34,97,0.10)", c: BRAND.red, dot: BRAND.red },
                      { l: "Danger", bg: BRAND.red, c: BRAND.maverick, dot: BRAND.maverick },
                      { l: "Neutral", bg: "rgba(15,15,25,0.06)", c: "rgba(15,15,25,0.7)", dot: "rgba(15,15,25,0.4)" },
                    ].map((s) => (
                      <span key={s.l} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs" style={{ backgroundColor: s.bg, color: s.c, fontFamily: "Inter, sans-serif" }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.dot }} /> {s.l}
                      </span>
                    ))}
                  </div>
                </Subsection>
              </section>

              {/* TYPOGRAPHY */}
              <section id="typography" className="scroll-mt-24 mt-32">
                <SectionHeader index="02" eyebrow="Typography" title="Two voices, one system." lede="Pilat Demi sets the headline. Inter does the work. Mono only for IDs, codes, and timestamps." />
                <Subsection label="Heading scale (Pilat Demi)">
                  <div className="space-y-6 rounded-xl bg-card p-8">
                    {[
                      { tag: "Display", size: "60px", className: "text-6xl" },
                      { tag: "H1", size: "48px", className: "text-5xl" },
                      { tag: "H2", size: "36px", className: "text-4xl" },
                      { tag: "H3", size: "24px", className: "text-2xl" },
                      { tag: "H4", size: "18px", className: "text-lg" },
                    ].map((t) => (
                      <div key={t.tag} className="flex items-baseline gap-6">
                        <div className="w-20 shrink-0 text-[11px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>{t.tag} · {t.size}</div>
                        <div className={`${t.className} tracking-tight`} style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>The quiet sea</div>
                      </div>
                    ))}
                  </div>
                </Subsection>
                <Subsection label="Body scale (Inter)">
                  <div className="space-y-4 rounded-xl bg-card p-8" style={{ fontFamily: "Inter, sans-serif" }}>
                    {[
                      { tag: "Lead", size: "18px", className: "text-lg" },
                      { tag: "Body", size: "16px", className: "text-base" },
                      { tag: "Small", size: "14px", className: "text-sm" },
                      { tag: "Caption", size: "12px", className: "text-xs" },
                    ].map((t) => (
                      <div key={t.tag} className="flex items-baseline gap-6">
                        <div className="w-20 shrink-0 text-[11px] uppercase tracking-widest text-muted-foreground">{t.tag} · {t.size}</div>
                        <p className={t.className} style={{ color: BRAND.cinder }}>Move cargo from origin to destination with calm, precise tooling.</p>
                      </div>
                    ))}
                    <div className="flex items-baseline gap-6 pt-2 border-t border-border/30">
                      <div className="w-20 shrink-0 text-[11px] uppercase tracking-widest text-muted-foreground">Mono</div>
                      <code className="font-mono text-sm" style={{ color: BRAND.cinder }}>MV-2026-005 · 14:32 UTC</code>
                    </div>
                  </div>
                </Subsection>
              </section>

              {/* SPACING */}
              <section id="spacing" className="scroll-mt-24 mt-32">
                <SectionHeader index="03" eyebrow="Spacing" title="Space is the design." lede="Most layouts need space, not borders. The 4px scale keeps rhythm consistent across pages." />
                <div className="rounded-xl bg-card p-8 space-y-3">
                  {[1, 2, 3, 4, 6, 8, 12, 16].map((s) => (
                    <div key={s} className="flex items-center gap-4">
                      <div className="w-16 text-xs font-mono text-muted-foreground">{s * 4}px</div>
                      <div className="rounded-sm" style={{ width: s * 4, height: 16, backgroundColor: BRAND.lucky }} />
                      <div className="text-xs text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>space-{s}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* RADIUS */}
              <section id="radius" className="scroll-mt-24 mt-32">
                <SectionHeader index="04" eyebrow="Radius" title="Soft, not bubbly." lede="Cards and surfaces use lg. Pills use full. Inputs match buttons." />
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[{ l: "sm", v: "4px", r: "rounded-sm" }, { l: "md", v: "6px", r: "rounded-md" }, { l: "lg", v: "10px", r: "rounded-lg" }, { l: "xl", v: "12px", r: "rounded-xl" }, { l: "full", v: "9999px", r: "rounded-full" }].map((r) => (
                    <div key={r.l} className="rounded-xl bg-card p-4 text-center">
                      <div className={`mx-auto h-16 w-16 mb-3 ${r.r}`} style={{ backgroundColor: BRAND.lucky }} />
                      <div className="text-xs" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>{r.l}</div>
                      <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{r.v}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SHADOW */}
              <section id="shadow" className="scroll-mt-24 mt-32">
                <SectionHeader index="05" eyebrow="Shadow" title="Whisper, don't shout." lede="Use shadow OR border. Never both. Most surfaces need neither." />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl" style={{ backgroundColor: "rgba(15,15,25,0.04)" }}>
                  {[{ l: "xs", c: "shadow-xs" }, { l: "sm", c: "shadow-sm" }, { l: "md", c: "shadow-md" }, { l: "lg", c: "shadow-lg" }].map((s) => (
                    <div key={s.l} className={`bg-card rounded-lg h-24 flex items-center justify-center ${s.c}`}>
                      <span className="text-xs" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>{s.l}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* BUTTONS */}
              <section id="buttons" className="scroll-mt-24 mt-32">
                <SectionHeader index="06" eyebrow="Buttons" title="Click feels good, or it doesn't ship." lede="Every button must show pointer cursor, hover, focus-ring, and active feedback. Test with the keyboard." />
                <Subsection label="Variants">
                  <div className="flex flex-wrap items-center gap-3 rounded-xl bg-card p-6">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </Subsection>
                <Subsection label="Sizes & icons">
                  <div className="flex flex-wrap items-center gap-3 rounded-xl bg-card p-6">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon" aria-label="Settings"><Settings /></Button>
                    <Button><Plus /> New voyage</Button>
                    <Button variant="outline"><Filter /> Filters</Button>
                    <Button variant="destructive"><Trash2 /> Delete</Button>
                  </div>
                </Subsection>
                <Subsection label="States">
                  <div className="flex flex-wrap items-center gap-3 rounded-xl bg-card p-6">
                    <Button disabled>Disabled</Button>
                    <Button disabled><Loader2 className="animate-spin" /> Loading</Button>
                    <Button variant="outline" disabled>Disabled outline</Button>
                  </div>
                </Subsection>
              </section>

              {/* FORMS */}
              <section id="forms" className="scroll-mt-24 mt-32">
                <SectionHeader index="07" eyebrow="Forms" title="Forms that don't fight back." lede="Labels above inputs, hint text below, error text replaces hint. Always validate on blur, never on every keystroke." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-xl bg-card p-6 space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="ds-vessel">Vessel name</Label>
                      <Input id="ds-vessel" placeholder="e.g. Atlantic Pioneer" />
                      <p className="text-xs text-muted-foreground">Use the registered name on the vessel certificate.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ds-imo">IMO number</Label>
                      <Input id="ds-imo" placeholder="9999999" defaultValue="123" aria-invalid />
                      <p className="text-xs" style={{ color: BRAND.red }}>IMO must be exactly 7 digits.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ds-port">Port of call</Label>
                      <Select>
                        <SelectTrigger id="ds-port"><SelectValue placeholder="Choose a port" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rotterdam">Rotterdam</SelectItem>
                          <SelectItem value="singapore">Singapore</SelectItem>
                          <SelectItem value="jebel-ali">Jebel Ali</SelectItem>
                          <SelectItem value="hamburg">Hamburg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ds-notes">Notes</Label>
                      <Textarea id="ds-notes" placeholder="Anything the harbour master should know…" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-card p-6 space-y-6">
                    <div className="space-y-3">
                      <Label>Cargo type</Label>
                      <RadioGroup defaultValue="container">
                        {["container", "bulk", "ro-ro"].map((v) => (
                          <div key={v} className="flex items-center gap-2">
                            <RadioGroupItem id={`r-${v}`} value={v} />
                            <Label htmlFor={`r-${v}`} className="font-normal capitalize cursor-pointer">{v}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Checkbox id="ds-haz" />
                        <div className="space-y-1">
                          <Label htmlFor="ds-haz" className="font-normal cursor-pointer">Hazardous cargo declared</Label>
                          <p className="text-xs text-muted-foreground">Triggers IMDG handling workflow.</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ds-prio" className="font-normal cursor-pointer">High priority</Label>
                        <Switch id="ds-prio" />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Berth number</Label>
                        <span className="text-xs font-mono text-muted-foreground">7</span>
                      </div>
                      <Slider defaultValue={[7]} max={20} min={1} step={1} />
                    </div>
                  </div>
                </div>
                <Subsection label="Combobox · date picker · OTP">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl bg-card p-6 space-y-2">
                      <Label>Origin port</Label>
                      <ComboboxDemo />
                      <p className="text-xs text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Searchable single-select. Use this any time the list has &gt; 6 options.</p>
                    </div>
                    <div className="rounded-xl bg-card p-6 space-y-2">
                      <Label>ETA window opens</Label>
                      <DatePickerDemo />
                      <p className="text-xs text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Calendar in a popover. Closes on selection.</p>
                    </div>
                    <div className="rounded-xl bg-card p-6 space-y-2">
                      <Label>Verification code</Label>
                      <InputOTP maxLength={6}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      <p className="text-xs text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>One-time codes. Auto-advance, paste-friendly.</p>
                    </div>
                  </div>
                </Subsection>
                <Subsection label="File upload">
                  <div className="rounded-xl bg-card p-6">
                    <FileUploadDemo />
                  </div>
                </Subsection>
              </section>

              {/* CARDS */}
              <section id="cards" className="scroll-mt-24 mt-32">
                <SectionHeader index="08" eyebrow="Cards" title="Surfaces that earn their wrapper." lede="A card means: this content is one unit. If you're using a card just to add a border, delete the border instead." />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Standard</CardTitle>
                      <CardDescription>Header, body, footer. The default.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Use for grouped, related content that should read as a single unit.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>On-time arrivals</div>
                      <div className="mt-2 text-4xl tracking-tight" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>94.2%</div>
                      <div className="mt-2 inline-flex items-center gap-1 text-xs" style={{ color: "#006d4a" }}>
                        <ArrowUp className="h-3 w-3" /> +2.1% vs last month
                      </div>
                    </CardContent>
                  </Card>
                  <Card style={{ background: `linear-gradient(135deg, ${BRAND.lucky} 0%, ${BRAND.green} 100%)` }}>
                    <CardContent className="pt-6 text-white">
                      <Globe className="h-6 w-6 mb-3 opacity-80" />
                      <div className="text-lg" style={{ fontFamily: "Pilat Demi" }}>Ports & Terminals</div>
                      <div className="text-xs mt-1 opacity-80" style={{ fontFamily: "Inter, sans-serif" }}>Lucky Point → Caribbean Green official gradient.</div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* TABLES */}
              <section id="tables" className="scroll-mt-24 mt-32">
                <SectionHeader index="09" eyebrow="Tables" title="Tables, with search and filter built in." lede="Search top-left, filter chips top-right, sort by clicking column headers, paginate at the bottom. This is the canonical pattern — don't reinvent it." />
                <VesselTable />
              </section>

              {/* NAVIGATION */}
              <section id="navigation" className="scroll-mt-24 mt-32">
                <SectionHeader index="10" eyebrow="Navigation" title="Wayfinding, no surprises." lede="Breadcrumbs for hierarchy, tabs for sibling views, accordions for dense reference." />
                <Subsection label="Breadcrumbs">
                  <div className="rounded-xl bg-card p-6">
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem><BreadcrumbLink href="#">Fleet</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbLink href="#">Vessels</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbPage>Atlantic Pioneer</BreadcrumbPage></BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </Subsection>
                <Subsection label="Tabs">
                  <div className="rounded-xl bg-card p-6">
                    <Tabs defaultValue="overview">
                      <TabsList>
                        <TabsTrigger value="overview" className="cursor-pointer">Overview</TabsTrigger>
                        <TabsTrigger value="cargo" className="cursor-pointer">Cargo</TabsTrigger>
                        <TabsTrigger value="crew" className="cursor-pointer">Crew</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview" className="mt-4 text-sm text-muted-foreground">Vessel telemetry, ETA, and recent voyages.</TabsContent>
                      <TabsContent value="cargo" className="mt-4 text-sm text-muted-foreground">Manifest and stowage plan.</TabsContent>
                      <TabsContent value="crew" className="mt-4 text-sm text-muted-foreground">Roster and certifications.</TabsContent>
                    </Tabs>
                  </div>
                </Subsection>
                <Subsection label="Accordion">
                  <div className="rounded-xl bg-card px-6">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="a"><AccordionTrigger className="cursor-pointer">When does ETA recalculate?</AccordionTrigger><AccordionContent className="text-sm text-muted-foreground">On every AIS ping and weather update.</AccordionContent></AccordionItem>
                      <AccordionItem value="b"><AccordionTrigger className="cursor-pointer">How are berth slots assigned?</AccordionTrigger><AccordionContent className="text-sm text-muted-foreground">By priority tier and arrival window.</AccordionContent></AccordionItem>
                    </Accordion>
                  </div>
                </Subsection>
                <Subsection label="Command palette (⌘K)">
                  <div className="rounded-xl bg-card p-6 flex items-center gap-3">
                    <CommandPaletteDemo />
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Press ⌘K (or Ctrl+K) anywhere on this page.</span>
                  </div>
                </Subsection>
                <Subsection label="Sidebar shell">
                  <MiniSidebarDemo />
                </Subsection>
              </section>

              {/* FEEDBACK */}
              <section id="feedback" className="scroll-mt-24 mt-32">
                <SectionHeader index="11" eyebrow="Feedback" title="Tell users what's happening." lede="Loading, empty, and error states are not optional. They are the contract." />
                <Subsection label="Alerts">
                  <div className="space-y-3">
                    <Alert><Info className="h-4 w-4" /><AlertTitle>Heads up</AlertTitle><AlertDescription>The schedule refreshes every 5 minutes from AIS data.</AlertDescription></Alert>
                    <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Permission denied</AlertTitle><AlertDescription>You can view this voyage but not edit it.</AlertDescription></Alert>
                    <Alert style={{ backgroundColor: "rgba(0,230,140,0.08)", borderColor: "rgba(0,230,140,0.3)" }}>
                      <CheckCircle2 className="h-4 w-4" style={{ color: "#006d4a" }} />
                      <AlertTitle style={{ color: "#006d4a" }}>Berthed</AlertTitle>
                      <AlertDescription>Atlantic Pioneer secured at slot 7B at 14:32 UTC.</AlertDescription>
                    </Alert>
                  </div>
                </Subsection>
                <Subsection label="Progress · spinner · skeleton">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl bg-card p-6">
                      <div className="text-xs text-muted-foreground mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Loading manifest</div>
                      <Progress value={progress} />
                      <div className="mt-2 text-xs font-mono text-muted-foreground">{progress}%</div>
                    </div>
                    <div className="rounded-xl bg-card p-6 flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" style={{ color: BRAND.lucky }} />
                      <span className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Fetching positions…</span>
                    </div>
                    <div className="rounded-xl bg-card p-6 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                </Subsection>
                <Subsection label="Empty & error states">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-card p-10 text-center">
                      <Inbox className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
                      <div className="text-base" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>No voyages yet</div>
                      <div className="text-sm text-muted-foreground mt-1 mb-5" style={{ fontFamily: "Inter, sans-serif" }}>Create your first voyage to start tracking.</div>
                      <Button><Plus /> New voyage</Button>
                    </div>
                    <div className="rounded-xl bg-card p-10 text-center" style={{ borderTop: `3px solid ${BRAND.red}` }}>
                      <AlertTriangle className="mx-auto h-10 w-10 mb-3" style={{ color: BRAND.red }} />
                      <div className="text-base" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>Couldn't reach AIS feed</div>
                      <div className="text-sm text-muted-foreground mt-1 mb-5" style={{ fontFamily: "Inter, sans-serif" }}>The data source returned a 503. We'll retry automatically.</div>
                      <Button variant="outline">Retry now</Button>
                    </div>
                  </div>
                </Subsection>
              </section>

              {/* OVERLAYS */}
              <section id="overlays" className="scroll-mt-24 mt-32">
                <SectionHeader index="12" eyebrow="Overlays" title="Overlays for focus, not for noise." lede="Dialog for a decision, sheet for a sub-task, popover for context, tooltip for a label." />
                <div className="rounded-xl bg-card p-6 flex flex-wrap items-center gap-3">
                  <Dialog>
                    <DialogTrigger asChild><Button variant="outline">Open dialog</Button></DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Confirm departure</DialogTitle><DialogDescription>The vessel will leave berth 7B in 15 minutes. Continue?</DialogDescription></DialogHeader>
                      <DialogFooter><Button variant="ghost">Cancel</Button><Button>Confirm departure</Button></DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Sheet>
                    <SheetTrigger asChild><Button variant="outline">Open sheet</Button></SheetTrigger>
                    <SheetContent>
                      <SheetHeader><SheetTitle>Voyage details</SheetTitle><SheetDescription>Edit metadata without leaving the table.</SheetDescription></SheetHeader>
                    </SheetContent>
                  </Sheet>
                  <Popover>
                    <PopoverTrigger asChild><Button variant="outline">Popover</Button></PopoverTrigger>
                    <PopoverContent className="text-sm">A popover is anchored UI for short, focused content.</PopoverContent>
                  </Popover>
                  <Tooltip>
                    <TooltipTrigger asChild><Button variant="outline">Tooltip</Button></TooltipTrigger>
                    <TooltipContent>Pure description. No actions.</TooltipContent>
                  </Tooltip>
                  <HoverCard>
                    <HoverCardTrigger asChild><Button variant="outline">Hover card</Button></HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      <div className="flex items-center gap-3">
                        <Avatar><AvatarFallback>AP</AvatarFallback></Avatar>
                        <div>
                          <div style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>Atlantic Pioneer</div>
                          <div className="text-xs text-muted-foreground">Container · 9,400 TEU</div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="outline"><MoreHorizontal /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">View</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Drawer>
                    <DrawerTrigger asChild><Button variant="outline">Open drawer</Button></DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-md">
                        <DrawerHeader>
                          <DrawerTitle style={{ fontFamily: "Pilat Demi" }}>Voyage details</DrawerTitle>
                          <DrawerDescription>Slides up from the bottom on mobile, side on desktop. Use for quick views, not destinations.</DrawerDescription>
                        </DrawerHeader>
                        <div className="px-4 pb-2 text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                          Atlantic Pioneer · Rotterdam → Singapore · ETA May 14, 2026.
                        </div>
                        <DrawerFooter>
                          <Button>Open full view</Button>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <div className="cursor-context-menu select-none rounded-md border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:bg-accent transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                        Right-click this row
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuLabel>Vessel actions</ContextMenuLabel>
                      <ContextMenuSeparator />
                      <ContextMenuItem className="cursor-pointer">Open</ContextMenuItem>
                      <ContextMenuItem className="cursor-pointer">Pin to top</ContextMenuItem>
                      <ContextMenuItem className="cursor-pointer">Share link</ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem className="cursor-pointer text-destructive">Archive</ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>
              </section>

              {/* CHARTS */}
              <section id="charts" className="scroll-mt-24 mt-32">
                <SectionHeader index="13" eyebrow="Charts" title="Color the data, not the chrome." lede="Lucky Point is the default series. Caribbean Green highlights positives. Radical Red highlights anomalies. Avoid grey-on-grey." />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2"><CardDescription>Voyages this year</CardDescription><CardTitle className="text-2xl" style={{ fontFamily: "Pilat Demi" }}>1,284</CardTitle></CardHeader>
                    <CardContent><LineChartDemo /></CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2"><CardDescription>Throughput by week</CardDescription><CardTitle className="text-2xl" style={{ fontFamily: "Pilat Demi" }}>72.4k <span className="text-sm text-muted-foreground font-sans">TEU</span></CardTitle></CardHeader>
                    <CardContent><BarChartDemo /></CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2"><CardDescription>Fleet status</CardDescription><CardTitle className="text-2xl" style={{ fontFamily: "Pilat Demi" }}>184 <span className="text-sm text-muted-foreground font-sans">vessels</span></CardTitle></CardHeader>
                    <CardContent><DonutChartDemo /></CardContent>
                  </Card>
                </div>
              </section>

              {/* LAYOUTS */}
              <section id="layouts" className="scroll-mt-24 mt-32">
                <SectionHeader index="14" eyebrow="Page Layouts" title="The four shells you'll reach for." lede="Every screen in a Shipping Solutions app is one of these. Pick the shell first, then build the content." />
                <Subsection label="App shell — sidebar + main">
                  <MiniSidebarDemo />
                </Subsection>
                <Subsection label="Dashboard grid — KPI row + chart + list">
                  <div className="rounded-xl bg-card p-6 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { l: "Vessels at sea", v: "24", d: "+3" },
                        { l: "In port", v: "11", d: "−1" },
                        { l: "Late arrivals", v: "2", d: "0" },
                        { l: "Fuel saved (mt)", v: "1,284", d: "+82" },
                      ].map((k) => (
                        <div key={k.l} className="rounded-lg bg-muted/30 p-3">
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>{k.l}</div>
                          <div className="mt-1 text-xl tracking-tight" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>{k.v}</div>
                          <div className="text-[11px]" style={{ color: BRAND.lucky, fontFamily: "Inter, sans-serif" }}>{k.d} this week</div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2 rounded-lg bg-muted/30 p-3">
                        <div className="text-xs text-muted-foreground mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Voyages — last 30 days</div>
                        <BarChartDemo />
                      </div>
                      <div className="rounded-lg bg-muted/30 p-3">
                        <div className="text-xs text-muted-foreground mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Berth utilization</div>
                        <DonutChartDemo />
                      </div>
                    </div>
                  </div>
                </Subsection>
                <Subsection label="List + detail (split)">
                  <div className="rounded-xl bg-card overflow-hidden border border-border/30">
                    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-[260px]">
                      <div className="border-r border-border/30">
                        <div className="px-4 py-3 border-b border-border/30 flex items-center gap-2">
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <input placeholder="Search vessels…" className="bg-transparent text-sm focus:outline-none w-full" style={{ fontFamily: "Inter, sans-serif" }} />
                        </div>
                        {[
                          { n: "Atlantic Pioneer", s: "At sea" },
                          { n: "Pacific Crown", s: "Berthed" },
                          { n: "Indian Wave", s: "At sea" },
                          { n: "Arctic Spirit", s: "Maintenance" },
                        ].map((r, i) => (
                          <button key={r.n} className={`cursor-pointer w-full text-left px-4 py-3 text-sm border-b border-border/20 hover:bg-accent active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset transition-colors ${i === 0 ? "bg-muted/40" : ""}`} style={{ fontFamily: "Inter, sans-serif" }}>
                            <div style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>{r.n}</div>
                            <div className="text-xs text-muted-foreground">{r.s}</div>
                          </button>
                        ))}
                      </div>
                      <div className="p-6">
                        <div className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Vessel</div>
                        <div className="text-2xl tracking-tight" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>Atlantic Pioneer</div>
                        <div className="text-sm text-muted-foreground mt-1" style={{ fontFamily: "Inter, sans-serif" }}>Container · 9,400 TEU · IMO 9876543</div>
                        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                          <div className="rounded-md bg-muted/30 p-3"><div className="text-[10px] uppercase tracking-widest text-muted-foreground">From</div><div style={{ fontFamily: "Pilat Demi" }}>Rotterdam, NL</div></div>
                          <div className="rounded-md bg-muted/30 p-3"><div className="text-[10px] uppercase tracking-widest text-muted-foreground">To</div><div style={{ fontFamily: "Pilat Demi" }}>Singapore, SG</div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Subsection>
                <Subsection label="Centered form — single-column focus">
                  <div className="rounded-xl bg-card p-8">
                    <div className="mx-auto max-w-md space-y-4">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>New voyage</div>
                        <div className="text-2xl tracking-tight" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>Schedule a sailing</div>
                      </div>
                      <div className="space-y-2"><Label htmlFor="ds-vessel">Vessel</Label><Input id="ds-vessel" placeholder="Atlantic Pioneer" /></div>
                      <div className="space-y-2"><Label>Origin</Label><ComboboxDemo /></div>
                      <div className="space-y-2"><Label>Departure</Label><DatePickerDemo /></div>
                      <div className="flex items-center justify-end gap-2 pt-2">
                        <Button variant="ghost">Cancel</Button>
                        <Button>Schedule</Button>
                      </div>
                    </div>
                  </div>
                </Subsection>
              </section>

              <section id="patterns" className="scroll-mt-24 mt-32 mb-24">
                <SectionHeader index="15" eyebrow="UX Patterns" title="The rules behind the components." lede="Recipes that aren't a single component — they're how the system behaves. Follow these and the apps stay coherent." />

                <Subsection label="Filtering — the canonical layout">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-card p-6">
                      <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#006d4a", fontFamily: "Inter, sans-serif" }}>Do</div>
                      <ul className="space-y-2 text-sm" style={{ fontFamily: "Inter, sans-serif", color: BRAND.cinder }}>
                        <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: BRAND.green }} /> Search input top-left, filter chips top-right of the data region.</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: BRAND.green }} /> Active filters shown as chips with an X to remove individually.</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: BRAND.green }} /> A "Clear all" link appears only when at least one filter is active.</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: BRAND.green }} /> Empty results show a clear "no match" state, not a blank table.</li>
                      </ul>
                    </div>
                    <div className="rounded-xl bg-card p-6">
                      <div className="text-xs uppercase tracking-widest mb-3" style={{ color: BRAND.red, fontFamily: "Inter, sans-serif" }}>Don't</div>
                      <ul className="space-y-2 text-sm" style={{ fontFamily: "Inter, sans-serif", color: BRAND.cinder }}>
                        <li className="flex gap-2"><X className="h-4 w-4 mt-0.5 shrink-0" style={{ color: BRAND.red }} /> Hide filters behind a "Filters" button by default — surface them.</li>
                        <li className="flex gap-2"><X className="h-4 w-4 mt-0.5 shrink-0" style={{ color: BRAND.red }} /> Apply filters on every keystroke without a clear "Apply" affordance for complex cases.</li>
                        <li className="flex gap-2"><X className="h-4 w-4 mt-0.5 shrink-0" style={{ color: BRAND.red }} /> Show an empty table with no explanation when nothing matches.</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3" style={{ fontFamily: "Inter, sans-serif" }}>See the live example in the Tables section above — that's the reference implementation.</p>
                </Subsection>

                <Subsection label="Search — debounce and feedback">
                  <div className="rounded-xl bg-card p-6 space-y-3">
                    <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: BRAND.cinder }}>
                      Inline list filters: filter on every keystroke (debounce 150ms if the list is &gt;500 items). Server-backed search: debounce 300ms and show a subtle spinner inside the input.
                    </p>
                    <p className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                      Global search (⌘K command palette) is the only acceptable place for cross-app search. Keep inline search scoped to the current view.
                    </p>
                  </div>
                </Subsection>

                <Subsection label="Hover & clickable affordance — non-negotiable">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-xl p-6" style={{ backgroundColor: "rgba(0,230,140,0.06)", border: "1px solid rgba(0,230,140,0.25)" }}>
                      <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#006d4a", fontFamily: "Inter, sans-serif" }}>Good — full feedback loop</div>
                      <button className="cursor-pointer inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-0" style={{ backgroundColor: BRAND.lucky, color: BRAND.maverick, fontFamily: "Inter, sans-serif" }}>
                        <ChevronRight className="h-4 w-4" /> Hover me, then tab to me
                      </button>
                      <p className="text-xs text-muted-foreground mt-3" style={{ fontFamily: "Inter, sans-serif" }}>cursor-pointer · hover lift + shadow · focus-visible ring · active press</p>
                    </div>
                    <div className="rounded-xl p-6" style={{ backgroundColor: "rgba(255,34,97,0.04)", border: "1px solid rgba(255,34,97,0.2)" }}>
                      <div className="text-xs uppercase tracking-widest mb-3" style={{ color: BRAND.red, fontFamily: "Inter, sans-serif" }}>Bad — silent button</div>
                      {/* Anti-pattern demo: deliberately stripped of cursor/hover/focus/active. Disabled here so the page itself doesn't violate the rule it's teaching. */}
                      <button
                        type="button"
                        aria-disabled="true"
                        tabIndex={-1}
                        onClick={(e) => e.preventDefault()}
                        className="pointer-events-none inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm bg-muted text-muted-foreground select-none"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        <ChevronRight className="h-4 w-4" /> Hover me, then tab to me
                      </button>
                      <p className="text-xs text-muted-foreground mt-3" style={{ fontFamily: "Inter, sans-serif" }}>No cursor change. No hover. No focus. No press. Don't ship this.</p>
                    </div>
                  </div>
                </Subsection>

                <Subsection label="Color contrast — earn the accent">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="rounded-xl p-6" style={{ backgroundColor: "rgba(255,34,97,0.04)", border: "1px solid rgba(255,34,97,0.2)" }}>
                      <div className="text-xs uppercase tracking-widest mb-4" style={{ color: BRAND.red, fontFamily: "Inter, sans-serif" }}>Boring — grey on grey</div>
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-xs text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Total throughput</div>
                        <div className="text-3xl text-muted-foreground mt-1" style={{ fontFamily: "Pilat Demi" }}>72,431</div>
                        <div className="text-xs text-muted-foreground mt-2">+4.2% vs last week</div>
                      </div>
                    </div>
                    <div className="rounded-xl p-6" style={{ backgroundColor: "rgba(0,230,140,0.06)", border: "1px solid rgba(0,230,140,0.25)" }}>
                      <div className="text-xs uppercase tracking-widest mb-4" style={{ color: "#006d4a", fontFamily: "Inter, sans-serif" }}>Alive — earned accent</div>
                      <div className="rounded-lg bg-card p-4" style={{ borderLeft: `3px solid ${BRAND.lucky}` }}>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Total throughput</div>
                        <div className="text-3xl mt-1" style={{ fontFamily: "Pilat Demi", color: BRAND.cinder }}>72,431</div>
                        <div className="inline-flex items-center gap-1 text-xs mt-2 px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(0,230,140,0.12)", color: "#006d4a" }}>
                          <ArrowUp className="h-3 w-3" /> +4.2% vs last week
                        </div>
                      </div>
                    </div>
                  </div>
                </Subsection>

                <Subsection label="The required trio: loading · empty · error">
                  <div className="rounded-xl bg-card p-6">
                    <div className="text-sm flex flex-wrap items-center gap-x-1.5 gap-y-2" style={{ fontFamily: "Inter, sans-serif", color: BRAND.cinder }}>
                      <span>Any data view that fetches must implement</span>
                      <Badge variant="secondary">loading</Badge>
                      <Badge variant="secondary">empty</Badge>
                      <Badge variant="secondary">error</Badge>
                      <span>. A blank screen during fetch is a bug. A blank screen on no-data is a bug. An unhandled error is a bug.</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3" style={{ fontFamily: "Inter, sans-serif" }}>See the Feedback section above for the canonical implementations.</p>
                  </div>
                </Subsection>

                <Subsection label="Whitespace over borders">
                  <div className="rounded-xl bg-card p-6">
                    <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: BRAND.cinder }}>
                      Group with <code className="text-xs font-mono">space-y-3</code>, not with bordered containers. If you must have a border, use <code className="text-xs font-mono">border-border/30</code> or lighter. The header is the only place that uses <code className="text-xs font-mono">border-border/50</code>.
                    </p>
                  </div>
                </Subsection>
              </section>

            </div>

            {/* Sticky right rail */}
            <aside className="hidden lg:block">
              <nav className="sticky top-24 rounded-xl bg-card p-3" style={{ fontFamily: "Inter, sans-serif" }}>
                {SECTIONS.map((s, i) => {
                  const isActive = active === s.id;
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`cursor-pointer flex items-center gap-3 px-3 py-1.5 rounded-md text-xs transition-colors hover:bg-accent active:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                      style={isActive ? { backgroundColor: "rgba(30,20,80,0.08)", color: BRAND.lucky } : { color: "rgba(15,15,25,0.55)" }}
                    >
                      <span className="font-mono text-[10px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                      <span>{s.label}</span>
                    </a>
                  );
                })}
              </nav>
            </aside>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
