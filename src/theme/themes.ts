// 主题定义
export interface Theme {
  id: string;
  name: string;
  group: "flavor" | "simple" | "rich";
  // 颜色变量（8色协调）
  bg: string;            // 1. 页面背景
  bgDeep: string;      // 2. 深层背景
  text: string;        // 3. 主文字
  textSoft: string;    // 4. 次要文字
  accent: string;      // 5. 强调色（印章/按钮）
  accent2: string;     // 6. 辅助强调色
  card: string;        // 7. 卡片/气泡背景
  cardBorder: string;  // 8. 卡片边框
  myBubble: string;   // 我气泡
  herCard: string;   // 他字卡底
  phoneShell: string;
  phoneScreen: string;
  // 渐变/装饰
  bgGradient?: string;
}

// ============ 风味主题 ============
export const FLAVOR_THEMES: Theme[] = [
  {
    id: "seasalt-tea",
    name: "海盐冰茶",
    group: "flavor",
    bg: "#E8F0F2",
    bgDeep: "#D8E6E8",
    text: "#2A3B47",
    textSoft: "#6B7F8B",
    accent: "#3A7CA5",
    accent2: "#7FB069",
    card: "#F2F7F8",
    cardBorder: "rgba(58,124,165,0.18)",
    myBubble: "#B8D8E0",
    herCard: "#F2F7F8",
    phoneShell: "#2A3B47",
    phoneScreen: "#E8F0F2",
    bgGradient: "radial-gradient(circle at 30% 20%, rgba(58,124,165,0.12) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(127,176,105,0.1) 0%, transparent 50%)",
  },
  {
    id: "orange-soda",
    name: "橘子汽水",
    group: "flavor",
    bg: "#FFF1DC",
    bgDeep: "#FFE3BC",
    text: "#5D2E0E",
    textSoft: "#9A6B4A",
    accent: "#E8751A",
    accent2: "#E8A33D",
    card: "#FFF8EC",
    cardBorder: "rgba(232,117,26,0.2)",
    myBubble: "#FFC07A",
    herCard: "#FFF8EC",
    phoneShell: "#5D2E0E",
    phoneScreen: "#FFF1DC",
    bgGradient: "radial-gradient(circle at 20% 30%, rgba(232,117,26,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(232,163,61,0.15) 0%, transparent 50%)",
  },
  {
    id: "strawberry-milk",
    name: "草莓奶霜",
    group: "flavor",
    bg: "#FFECF0",
    bgDeep: "#FFD9E3",
    text: "#5B2C3E",
    textSoft: "#9A6575",
    accent: "#E85C8B",
    accent2: "#F29B9B",
    card: "#FFF5F7",
    cardBorder: "rgba(232,92,139,0.2)",
    myBubble: "#FFB8CC",
    herCard: "#FFF5F7",
    phoneShell: "#5B2C3E",
    phoneScreen: "#FFECF0",
    bgGradient: "radial-gradient(circle at 30% 20%, rgba(232,92,139,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(242,155,155,0.2) 0%, transparent 50%)",
  },
  {
    id: "rice-pudding",
    name: "糯米雪糕",
    group: "flavor",
    bg: "#F5F1EA",
    bgDeep: "#E8E2D5",
    text: "#4A4238",
    textSoft: "#8B8070",
    accent: "#C4A77D",
    accent2: "#A8B5A0",
    card: "#FBF8F2",
    cardBorder: "rgba(196,167,125,0.25)",
    myBubble: "#E8DCC4",
    herCard: "#FBF8F2",
    phoneShell: "#4A4238",
    phoneScreen: "#F5F1EA",
    bgGradient: "radial-gradient(circle at 25% 30%, rgba(196,167,125,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 70%, rgba(168,181,160,0.12) 0%, transparent 50%)",
  },
  {
    id: "taro-bobo",
    name: "芋泥波波",
    group: "flavor",
    bg: "#F0EAF5",
    bgDeep: "#E1D4EC",
    text: "#3F2B52",
    textSoft: "#7A6590",
    accent: "#8B6DB8",
    accent2: "#C59FC5",
    card: "#F7F2FB",
    cardBorder: "rgba(139,109,184,0.25)",
    myBubble: "#C9B5E0",
    herCard: "#F7F2FB",
    phoneShell: "#3F2B52",
    phoneScreen: "#F0EAF5",
    bgGradient: "radial-gradient(circle at 30% 20%, rgba(139,109,184,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(197,159,197,0.18) 0%, transparent 50%)",
  },
  {
    id: "lime-soda",
    name: "鲜柠汽水",
    group: "flavor",
    bg: "#EFF8E8",
    bgDeep: "#DBEEC9",
    text: "#2D4A24",
    textSoft: "#6A8560",
    accent: "#7CB342",
    accent2: "#C0CA33",
    card: "#F4FBED",
    cardBorder: "rgba(124,179,66,0.2)",
    myBubble: "#C8E0A8",
    herCard: "#F4FBED",
    phoneShell: "#2D4A24",
    phoneScreen: "#EFF8E8",
    bgGradient: "radial-gradient(circle at 25% 30%, rgba(124,179,66,0.12) 0%, transparent 50%), radial-gradient(circle at 75% 70%, rgba(192,202,51,0.15) 0%, transparent 50%)",
  },
  {
    id: "bw-minimal",
    name: "黑白简约",
    group: "flavor",
    bg: "#F5F5F5",
    bgDeep: "#EBEBEB",
    text: "#1A1A1A",
    textSoft: "rgba(0,0,0,0.45)",
    accent: "rgba(0,0,0,0.75)",
    accent2: "rgba(0,0,0,0.55)",
    card: "rgba(255,255,255,0.85)",
    cardBorder: "rgba(0,0,0,0.06)",
    myBubble: "rgba(0,0,0,0.82)",
    herCard: "rgba(255,255,255,0.85)",
    phoneShell: "#1A1A1A",
    phoneScreen: "#F5F5F5",
    bgGradient: "radial-gradient(circle at 30% 20%, rgba(0,0,0,0.04) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.02) 0%, transparent 50%)",
  },
  {
    id: "dopamine",
    name: "多巴胺",
    group: "flavor",
    bg: "#FFF8F0",
    bgDeep: "#FFEDD8",
    text: "#3D2B1F",
    textSoft: "#9B7A5A",
    accent: "#E85D04",
    accent2: "#FAA307",
    card: "#FFFFFF",
    cardBorder: "rgba(232,93,4,0.15)",
    myBubble: "#FAA307",
    herCard: "#FFF8F0",
    phoneShell: "#3D2B1F",
    phoneScreen: "#FFF8F0",
    bgGradient: "radial-gradient(circle at 20% 30%, rgba(232,93,4,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(250,163,7,0.18) 0%, transparent 50%)",
  },
  {
    id: "morandi",
    name: "莫兰迪",
    group: "flavor",
    bg: "#EDE8E4",
    bgDeep: "#DDD5CE",
    text: "#5A5048",
    textSoft: "#8B8278",
    accent: "#A0938E",
    accent2: "#B8A89A",
    card: "#F5F0EC",
    cardBorder: "rgba(160,147,142,0.2)",
    myBubble: "#C4B8AB",
    herCard: "#F5F0EC",
    phoneShell: "#5A5048",
    phoneScreen: "#EDE8E4",
    bgGradient: "radial-gradient(circle at 30% 20%, rgba(160,147,142,0.12) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(184,168,154,0.15) 0%, transparent 50%)",
  },
];

// ============ 简约单色主题（低饱和）============
const SIMPLE_COLORS = [
  { id: "simple-red", name: "简约·红", color: "#B85450" },
  { id: "simple-orange", name: "简约·橙", color: "#C97B3A" },
  { id: "simple-yellow", name: "简约·黄", color: "#C9A93A" },
  { id: "simple-green", name: "简约·绿", color: "#5F9B5F" },
  { id: "simple-cyan", name: "简约·青", color: "#4A9A9A" },
  { id: "simple-blue", name: "简约·蓝", color: "#5A7BB0" },
  { id: "simple-purple", name: "简约·紫", color: "#8B6DB8" },
];

function makeSimpleTheme(id: string, name: string, accent: string): Theme {
  const dark = adjustBrightness(accent, -0.5);
  const soft = adjustBrightness(accent, 0.1);
  return {
    id,
    name,
    group: "simple",
    bg: "#FAFAF7",
    bgDeep: "#EFEFEA",
    text: "#2A2A28",
    textSoft: "#7A7A75",
    accent,
    accent2: soft,
    card: "#FFFFFF",
    cardBorder: `${accent}22`,
    myBubble: adjustBrightness(accent, 0.55),
    herCard: "#FFFFFF",
    phoneShell: dark,
    phoneScreen: "#FAFAF7",
    bgGradient: `radial-gradient(circle at 30% 20%, ${accent}15 0%, transparent 55%)`,
  };
}

function adjustBrightness(hex: string, factor: number): string {
  // factor: -1 到 1，负值变暗，正值变亮
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const adj = (c: number) =>
    Math.max(0, Math.min(255, Math.round(factor >= 0 ? c + (255 - c) * factor : c * (1 + factor))));
  const toHex = (c: number) => c.toString(16).padStart(2, "0");
  return `#${toHex(adj(r))}${toHex(adj(g))}${toHex(adj(b))}`;
}

export const SIMPLE_THEMES: Theme[] = SIMPLE_COLORS.map((c) =>
  makeSimpleTheme(c.id, c.name, c.color),
);

// ============ 8色协调丰富主题 ============
export const RICH_THEMES: Theme[] = [
  {
    id: "cherry-blossom",
    name: "樱花物语",
    group: "rich",
    bg: "#FFF0F3",
    bgDeep: "#FFD6DE",
    text: "#7A2E42",
    textSoft: "#B57080",
    accent: "#E89AA8",
    accent2: "#A8D4B8",
    card: "#FFFAFB",
    cardBorder: "rgba(232,154,168,0.2)",
    myBubble: "#F5C0CC",
    herCard: "#FFF5F7",
    phoneShell: "#7A2E42",
    phoneScreen: "#FFF0F3",
    bgGradient: "radial-gradient(circle at 15% 20%, rgba(232,154,168,0.2) 0%, transparent 50%), radial-gradient(circle at 85% 80%, rgba(168,212,184,0.15) 0%, transparent 55%), radial-gradient(circle at 50% 50%, rgba(255,200,210,0.12) 0%, transparent 60%)",
  },
  {
    id: "mint-lemon",
    name: "薄荷柠檬",
    group: "rich",
    bg: "#F0FAF0",
    bgDeep: "#D0EBD2",
    text: "#2E5A38",
    textSoft: "#6B9A70",
    accent: "#6BBF7A",
    accent2: "#E8D850",
    card: "#FAFFF8",
    cardBorder: "rgba(107,191,122,0.22)",
    myBubble: "#A8E0B0",
    herCard: "#F2FFF0",
    phoneShell: "#2E5A38",
    phoneScreen: "#F0FAF0",
    bgGradient: "radial-gradient(circle at 20% 25%, rgba(107,191,122,0.18) 0%, transparent 55%), radial-gradient(circle at 80% 75%, rgba(232,216,80,0.18) 0%, transparent 50%)",
  },
  {
    id: "ocean-sunset",
    name: "海街落日",
    group: "rich",
    bg: "#F0F2FA",
    bgDeep: "#D0D8EC",
    text: "#2E3A5C",
    textSoft: "#6B7AA0",
    accent: "#5A7BB0",
    accent2: "#E88A5C",
    card: "#FAFCFF",
    cardBorder: "rgba(90,123,176,0.2)",
    myBubble: "#B0C4E0",
    herCard: "#F2F6FF",
    phoneShell: "#2E3A5C",
    phoneScreen: "#F0F2FA",
    bgGradient: "radial-gradient(circle at 15% 15%, rgba(90,123,176,0.18) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(232,138,92,0.22) 0%, transparent 50%)",
  },
  {
    id: "forest-mist",
    name: "森林薄雾",
    group: "rich",
    bg: "#EDF2E8",
    bgDeep: "#D4DCC8",
    text: "#3A4A30",
    textSoft: "#7A8A6B",
    accent: "#7A9A5B",
    accent2: "#9A8B6B",
    card: "#F7FAF2",
    cardBorder: "rgba(122,154,91,0.25)",
    myBubble: "#B8CC9A",
    herCard: "#F2F7EB",
    phoneShell: "#3A4A30",
    phoneScreen: "#EDF2E8",
    bgGradient: "radial-gradient(circle at 25% 20%, rgba(122,154,91,0.2) 0%, transparent 55%), radial-gradient(circle at 75% 80%, rgba(154,139,107,0.18) 0%, transparent 55%)",
  },
  {
    id: "lavender-dream",
    name: "薰衣草梦",
    group: "rich",
    bg: "#F5F0FA",
    bgDeep: "#E0D4F0",
    text: "#4A3A6C",
    textSoft: "#8A7AA5",
    accent: "#9B7EC8",
    accent2: "#D8A0C0",
    card: "#FCF9FF",
    cardBorder: "rgba(155,126,200,0.25)",
    myBubble: "#C8B8E0",
    herCard: "#F8F2FF",
    phoneShell: "#4A3A6C",
    phoneScreen: "#F5F0FA",
    bgGradient: "radial-gradient(circle at 20% 25%, rgba(155,126,200,0.2) 0%, transparent 55%), radial-gradient(circle at 80% 75%, rgba(216,160,192,0.22) 0%, transparent 55%)",
  },
  {
    id: "coffee-milk",
    name: "焦糖拿铁",
    group: "rich",
    bg: "#F8F0E8",
    bgDeep: "#E8D4C0",
    text: "#5C4028",
    textSoft: "#9A7E60",
    accent: "#B8865A",
    accent2: "#D4A878",
    card: "#FDF8F2",
    cardBorder: "rgba(184,134,90,0.25)",
    myBubble: "#E0C4A0",
    herCard: "#FBF5ED",
    phoneShell: "#5C4028",
    phoneScreen: "#F8F0E8",
    bgGradient: "radial-gradient(circle at 20% 20%, rgba(184,134,90,0.2) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(212,168,120,0.22) 0%, transparent 55%)",
  },
  {
    id: "peach-sky",
    name: "蜜桃晴空",
    group: "rich",
    bg: "#FFF5F0",
    bgDeep: "#FFD8C8",
    text: "#6C3A28",
    textSoft: "#A57060",
    accent: "#E88B6E",
    accent2: "#7AB0D0",
    card: "#FFFCFA",
    cardBorder: "rgba(232,139,110,0.22)",
    myBubble: "#F5C0A8",
    herCard: "#FFF8F5",
    phoneShell: "#6C3A28",
    phoneScreen: "#FFF5F0",
    bgGradient: "radial-gradient(circle at 15% 25%, rgba(232,139,110,0.2) 0%, transparent 55%), radial-gradient(circle at 85% 75%, rgba(122,176,208,0.2) 0%, transparent 55%)",
  },
  {
    id: "candy-pop",
    name: "糖果乐园",
    group: "rich",
    bg: "#FFF5FA",
    bgDeep: "#FFD8EC",
    text: "#5C2E5C",
    textSoft: "#A065A0",
    accent: "#E07AC8",
    accent2: "#7AD0E0",
    card: "#FFFAFF",
    cardBorder: "rgba(224,122,200,0.22)",
    myBubble: "#F0B8E0",
    herCard: "#FFF5FC",
    phoneShell: "#5C2E5C",
    phoneScreen: "#FFF5FA",
    bgGradient: "radial-gradient(circle at 20% 15%, rgba(224,122,200,0.22) 0%, transparent 50%), radial-gradient(circle at 80% 85%, rgba(122,208,224,0.2) 0%, transparent 55%)",
  },
];

export const ALL_THEMES: Theme[] = [...FLAVOR_THEMES, ...SIMPLE_THEMES, ...RICH_THEMES];

export function getTheme(id: string): Theme {
  return ALL_THEMES.find((t) => t.id === id) ?? FLAVOR_THEMES[3];
}
