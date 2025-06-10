// Board layout definitions for 4x4 and 9x9 games
export const BOARD_LAYOUTS = {
  '4x4': {
    rows: 14,
    cols: 14,
    layout: [
      // Row 1
      Array(14).fill('MT_empty.png'),
      // Row 2
      ['MT_empty.png', 'MT_corner-lower-right.png', ...Array(4).fill('MT_bottom-middle-side.png'), 'MT_corner-lower-left.png', ...Array(7).fill('MT_empty.png')],
      // Row 3
      ['MT_empty.png', 'MT_right-middle-side.png', 'MT_left-upper-corner.png', 'MT_right-upper-corner.png', 'MT_left-upper-corner.png', 'MT_right-upper-corner.png', 'MT_left-middle-side.png', ...Array(7).fill('MT_empty.png')],
      // Row 4
      ['MT_empty.png', 'MT_right-middle-side.png', 'MT_left-lower-corner.png', 'MT_right-lower-corner.png', 'MT_left-lower-corner.png', 'MT_right-lower-corner.png', 'MT_left-middle-side.png', ...Array(7).fill('MT_empty.png')],
      // Row 5
      ['MT_empty.png', 'MT_right-middle-side.png', 'MT_left-upper-corner.png', 'MT_right-upper-corner.png', 'MT_left-upper-corner.png', 'MT_right-upper-corner.png', 'MT_left-middle-side.png', ...Array(7).fill('MT_empty.png')],
      // Row 6
      ['MT_empty.png', 'MT_right-middle-side.png', 'MT_left-lower-corner.png', 'MT_right-lower-corner.png', 'MT_left-lower-corner.png', 'MT_left-middle-side.png', ...Array(7).fill('MT_empty.png')],
      // Row 7
      ['MT_empty.png', 'MT_corner-upper-right.png', ...Array(4).fill('MT_upper-middle-side.png'), 'MT_corner-upper-left.png', ...Array(7).fill('MT_empty.png')],
      // Rows 8-14
      ...Array(7).fill(Array(14).fill('MT_empty.png'))
    ]
  },
  '9x9': {
    rows: 14,
    cols: 14,
    layout: [
      // Row 1
      Array(14).fill('MT_empty.png'),
      // Row 2
      ['MT_empty.png', 'MT_corner-lower-right.png', ...Array(9).fill('MT_bottom-middle-side.png'), 'MT_corner-lower-left.png', ...Array(2).fill('MT_empty.png')],
      // Row 3
      ['MT_empty.png', 'MT_right-middle-side.png', 'MT_left-upper-corner.png', 'MT_upper-middle-side.png', 'MT_right-upper-corner.png', 'MT_left-upper-corner.png', 'MT_upper-middle-side.png', 'MT_right-upper-corner.png', 'MT_left-upper-corner.png', 'MT_upper-middle-side.png', 'MT_right-upper-corner.png', 'MT_left-middle-side.png', ...Array(2).fill('MT_empty.png')],
      // Row 4
      ['MT_empty.png', 'MT_right-middle-side.png', 'MT_left-middle-side.png', 'MT_empty.png', 'MT_right-middle-side.png', 'MT_left-middle-side.png', 'MT_empty.png', 'MT_right-middle-side.png', 'MT_left-middle-side.png', 'MT_empty.png', 'MT_right-middle-side.png', 'MT_left-middle-side.png', ...Array(2).fill('MT_empty.png')],
      // Row 5
      ['MT_empty.png', 'MT_right-middle-side.png', 'MT_left-lower-corner.png', 'MT_bottom-middle-side.png', 'MT_right-lower-corner.png', 'MT_left-lower-corner.png', 'MT_bottom-middle-side.png', 'MT_right-lower-corner.png', 'MT_left-lower-corner.png', 'MT_bottom-middle-side.png', 'MT_right-lower-corner.png', 'MT_right-middle-side.png', ...Array(2).fill('MT_empty.png')],
      // Row 6
      ['MT_empty.png', 'MT_right-middle-side.png', 'MT_left-upper-corner.png', 'MT_upper-middle-side.png', 'MT_right-upper-corner.png', 'MT_left-upper-corner.png', 'MT_upper-middle-side.png', 'MT_right-upper-corner.png', 'MT_left-upper-corner.png', 'MT_upper-middle-side.png', 'MT_right-upper-corner.png', 'MT_left-middle-side.png', ...Array(2).fill('MT_empty.png')],
      // Row 7
      ['MT_empty.png', 'MT_right-middle-side.png', 'MT_left-middle-side.png', 'MT_empty.png', 'MT_right-middle-side.png', 'MT_left-middle-side.png', 'MT_empty.png', 'MT_right-middle-side.png', 'MT_left-middle-side.png', 'MT_empty.png', 'MT_right-middle-side.png', 'MT_left-middle-side.png', ...Array(2).fill('MT_empty.png')],
      // Row 8
      ['MT_empty.png', 'MT_right-middle-side.png', 'MT_left-lower-corner.png', 'MT_bottom-middle-side.png', 'MT_right-lower-corner.png', 'MT_left-lower-corner.png', 'MT_bottom-middle-side.png', 'MT_right-lower-corner.png', 'MT_left-lower-corner.png', 'MT_bottom-middle-side.png', 'MT_right-lower-corner.png', 'MT_right-middle-side.png', ...Array(2).fill('MT_empty.png')],
      // Row 9
      ['MT_empty.png', 'MT_right-middle-side.png', 'MT_left-upper-corner.png', 'MT_upper-middle-side.png', 'MT_right-upper-corner.png', 'MT_left-upper-corner.png', 'MT_upper-middle-side.png', 'MT_right-upper-corner.png', 'MT_left-upper-corner.png', 'MT_upper-middle-side.png', 'MT_right-upper-corner.png', 'MT_left-middle-side.png', ...Array(2).fill('MT_empty.png')],
      // Row 10
      ['MT_empty.png', 'MT_right-middle-side.png', 'MT_left-middle-side.png', 'MT_empty.png', 'MT_right-middle-side.png', 'MT_left-middle-side.png', 'MT_empty.png', 'MT_right-middle-side.png', 'MT_left-middle-side.png', 'MT_empty.png', 'MT_right-middle-side.png', 'MT_left-middle-side.png', ...Array(2).fill('MT_empty.png')],
      // Row 11
      ['MT_empty.png', 'MT_right-middle-side.png', 'MT_left-lower-corner.png', 'MT_bottom-middle-side.png', 'MT_right-lower-corner.png', 'MT_left-lower-corner.png', 'MT_bottom-middle-side.png', 'MT_right-lower-corner.png', 'MT_left-lower-corner.png', 'MT_bottom-middle-side.png', 'MT_right-lower-corner.png', 'MT_right-middle-side.png', ...Array(2).fill('MT_empty.png')],
      // Row 12
      ['MT_empty.png', 'MT_corner-upper-right.png', ...Array(9).fill('MT_upper-middle-side.png'), 'MT_corner-upper-left.png', ...Array(2).fill('MT_empty.png')],
      // Rows 13-14
      ...Array(2).fill(Array(14).fill('MT_empty.png'))
    ]
  }
}; 