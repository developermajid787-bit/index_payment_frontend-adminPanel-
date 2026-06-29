import {
  Activity,
  ArrowRightLeft,
  Ban,
  Briefcase,
  ChartBar,
  Coins,
  CreditCard,
  FileWarning,
  Headset,
  IdCard,
  Key,
  Landmark,
  Layers,
  LayoutDashboard,
  Link2,
  Lock,
  type LucideIcon,
  PiggyBank,
  PlusCircle,
  Radar,
  Settings,
  Shield,
  ShieldCheck,
  Store,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards & Analytics",
    items: [
      {
        id: "overview",
        title: "Overview",
        url: "/dashboard/overview",
        icon: LayoutDashboard,
        badge: "soon",
      },
      {
        id: "analytics",
        title: "Financial Analytics",
        url: "/dashboard/analytics",
        icon: ChartBar,
        badge: "soon",
      },
    ],
  },
  {
    id: 2,
    label: "User & Account Management",
    items: [
      {
        id: "users",
        title: "Users Management",
        icon: Users,
        badge: "soon",
        subItems: [
          {
            id: "new",
            title: "Add New User",
            url: "/dashboard/users/new",
            icon: PlusCircle,
            // بدون وسام
          },
        ],
      },
      {
        id: "cardholders",
        title: "Cardholders",
        url: "/dashboard/users/cardholders",
        icon: IdCard,
        badge: "soon",
      },
      {
        id: "merchants",
        title: "Merchants",
        url: "/dashboard/users/merchants",
        icon: Store,
        badge: "soon",
      },
      {
        id: "agents",
        title: "Agents & Partners",
        url: "/dashboard/users/agents",
        icon: Briefcase,
        badge: "soon",
      },
      {
        id: "staff",
        title: "Staff",
        url: "/dashboard/users/staff",
        icon: UserCog,
        badge: "soon",
      },
    ],
  },
  {
    id: 3,
    label: "Core Banking & Ledger",
    items: [
      {
        id: "wallets",
        title: "Wallets & Accounts",
        url: "/dashboard/wallets",
        icon: Wallet,
        badge: "soon",
      },
      {
        id: "transactions",
        title: "Transactions Ledger",
        url: "/dashboard/wallets/transactions",
        icon: ArrowRightLeft,
        badge: "soon",
      },
      {
        id: "settlements",
        title: "Settlements & Clearing",
        url: "/dashboard/wallets/settlements",
        icon: Landmark,
        badge: "soon",
      },
      {
        id: "deposit",
        title: "Deposit Requests",
        url: "/dashboard/wallets/deposits",
        icon: PiggyBank,
        badge: "soon",
      },
    ],
  },
  {
    id: 4,
    label: "Issuing & Acquiring",
    items: [
      {
        id: "cards",
        title: "Card Management",
        icon: CreditCard,
        badge: "soon",
        subItems: [
          {
            id: "link",
            title: "Link With Wallet",
            url: "/dashboard/cards/link",
            icon: Link2,
            badge: "soon",
          },
          {
            id: "issue",
            title: "Issue New Card",
            url: "/dashboard/cards/issue",
            icon: PlusCircle,
            badge: "soon",
          },
          {
            id: "stock",
            title: "Cards Stock",
            url: "/dashboard/cards/stock",
            icon: Layers,
            badge: "soon",
          },
        ],
      },
      {
        id: "card_transactions",
        title: "Card Transactions",
        url: "/dashboard/cards/transactions",
        icon: Activity,
        badge: "soon",
      },
    ],
  },
  {
    id: 5,
    label: "Risk, Compliance & Fraud",
    items: [
      {
        id: "compliance",
        title: "AML / Compliance",
        url: "/dashboard/compliance",
        icon: ShieldCheck,
        badge: "soon",
      },
      {
        id: "risks",
        title: "Fraud & Risk Radar",
        url: "/dashboard/risks",
        icon: Radar,
        badge: "soon",
      },
      {
        id: "block",
        title: "Block Accounts",
        url: "/dashboard/block",
        icon: Ban,
        badge: "soon",
      },
    ],
  },
  {
    id: 6,
    label: "Operations & Support",
    items: [
      {
        id: "support",
        title: "Support Tickets",
        url: "/dashboard/support",
        icon: Headset,
        badge: "soon",
      },
      {
        id: "disputes",
        title: "Disputes & Chargebacks",
        url: "/dashboard/disputes",
        icon: FileWarning,
        badge: "soon",
      },
    ],
  },
  {
    id: 7,
    label: "System Settings & Access Control",
    items: [
      {
        id: "roles_permissions",
        title: "Roles & Permissions",
        icon: Lock,
        badge: "soon",
        subItems: [
          {
            id: "roles",
            title: "Roles",
            url: "/dashboard/roles",
            icon: Shield,
            badge: "soon",
          },
          {
            id: "permissions",
            title: "Permissions",
            url: "/dashboard/permissions",
            icon: Key,
            badge: "soon",
          },
        ],
      },
      {
        id: "fees",
        title: "Fee & Commission",
        url: "/dashboard/fees",
        icon: Coins,
        badge: "soon",
      },
      {
        id: "settings",
        title: "General Settings",
        url: "/dashboard/settings",
        icon: Settings,
        badge: "soon",
      },
    ],
  },
];
