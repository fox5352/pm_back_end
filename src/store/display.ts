import { Package, get } from './invoke';

export async function get_is_live(): Promise<boolean | null> {
  let res: Package<boolean> = await get('get_is_live');

  if (res.error) {
    console.error('Failed to get live status:', res.message);
    return null;
  } else {
    return res.data;
  }
}

export async function toggle_live() {
  const res = await get('toggle_is_live');

  if (res.error) {
    console.error('Failed to toggle live status:', res.message);
    return;
  }
}
