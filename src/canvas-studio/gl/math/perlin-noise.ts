//////////////////////////////////////////////////////////////

// http://mrl.nyu.edu/~perlin/noise/
// Adapting from PApplet.java
// which was adapted from toxi
// which was adapted from the german demo group farbrausch
// as used in their demo "art": http://www.farb-rausch.de/fr010src.zip

// someday we might consider using "improved noise"
// http://mrl.nyu.edu/~perlin/paper445.pdf
// See: https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/
//      blob/main/introduction/Noise1D/noise.js

type LCG = {
  setSeed: (val: number | null) => void
  getSeed: () => number
  rand: () => number
}

class PerlinNoise3D {
  private static PERLIN_YWRAPB = 4
  private static PERLIN_YWRAP = 1 << PerlinNoise3D.PERLIN_YWRAPB
  private static PERLIN_ZWRAPB = 8
  private static PERLIN_ZWRAP = 1 << PerlinNoise3D.PERLIN_ZWRAPB
  private static PERLIN_SIZE = 4095

  private static SINCOS_PRECISION = 0.5
  private static SINCOS_LENGTH = Math.floor(360 / PerlinNoise3D.SINCOS_PRECISION)
  private static sinLUT: number[] = new Array(PerlinNoise3D.SINCOS_LENGTH)
  private static cosLUT: number[] = new Array(PerlinNoise3D.SINCOS_LENGTH)
  private static DEG_TO_RAD = Math.PI / 180.0

  private perlin_octaves: number
  private perlin_amp_falloff: number
  private perlin: number[] | null

  constructor() {
    for (let i = 0; i < PerlinNoise3D.SINCOS_LENGTH; i++) {
      PerlinNoise3D.sinLUT[i] = Math.sin(i * PerlinNoise3D.DEG_TO_RAD * PerlinNoise3D.SINCOS_PRECISION)
      PerlinNoise3D.cosLUT[i] = Math.cos(i * PerlinNoise3D.DEG_TO_RAD * PerlinNoise3D.SINCOS_PRECISION)
    }

    this.perlin_octaves = 4 // default to medium smooth
    this.perlin_amp_falloff = 0.5 // 50% reduction/octave
    this.perlin = null
  }

  private static createLCG(): LCG {
    const m = 4294967296
    const a = 1664525
    const c = 1013904223
    let seed: number, z: number

    return {
      setSeed: function (val) {
        z = seed = (val === null ? Math.random() * m : val) >>> 0
      },
      getSeed: function () {
        return seed
      },
      rand: function () {
        z = (a * z + c) % m
        return z / m
      },
    }
  }

  noiseSeed(seed: number): PerlinNoise3D {
    const lcg = PerlinNoise3D.createLCG()
    lcg.setSeed(seed)
    this.perlin = new Array(PerlinNoise3D.PERLIN_SIZE + 1)
    for (let i = 0; i < PerlinNoise3D.PERLIN_SIZE + 1; i++) {
      this.perlin[i] = lcg.rand()
    }
    return this
  }

  get(x: number, y = 0, z = 0): number {
    if (this.perlin === null) {
      this.perlin = new Array(PerlinNoise3D.PERLIN_SIZE + 1)
      for (let i = 0; i < PerlinNoise3D.PERLIN_SIZE + 1; i++) {
        this.perlin[i] = Math.random()
      }
    }

    x = Math.abs(x)
    y = Math.abs(y)
    z = Math.abs(z)

    let xi = Math.floor(x)
    let yi = Math.floor(y)
    let zi = Math.floor(z)
    let xf = x - xi
    let yf = y - yi
    let zf = z - zi

    const scaled_cosine = (i: number): number => 0.5 * (1.0 - Math.cos(i * Math.PI))

    let r = 0
    let ampl = 0.5

    for (let o = 0; o < this.perlin_octaves; o++) {
      const of = xi + (yi << PerlinNoise3D.PERLIN_YWRAPB) + (zi << PerlinNoise3D.PERLIN_ZWRAPB)

      const rxf = scaled_cosine(xf)
      const ryf = scaled_cosine(yf)

      const n1 = this.perlin[of & PerlinNoise3D.PERLIN_SIZE]

      const n2 = this.perlin[(of + PerlinNoise3D.PERLIN_YWRAP) & PerlinNoise3D.PERLIN_SIZE]
      const n3 = this.perlin[(of + PerlinNoise3D.PERLIN_ZWRAP) & PerlinNoise3D.PERLIN_SIZE]

      const n4 = this.perlin[(of + 1) & PerlinNoise3D.PERLIN_SIZE]
      const n5 = this.perlin[(of + PerlinNoise3D.PERLIN_YWRAP + 1) & PerlinNoise3D.PERLIN_SIZE]
      const n6 = this.perlin[(of + PerlinNoise3D.PERLIN_ZWRAP + 1) & PerlinNoise3D.PERLIN_SIZE]

      if (!n6 || !n5 || !n4 || !n3 || !n2 || !n1) throw new Error('something is undefined when unwrapping this.perlin')

      const n1_interp = n1 + rxf * (n4 - n1)
      const n2_interp = n2 + rxf * (n5 - n2)
      const n1n2_interp = n1_interp + ryf * (n2_interp - n1_interp)

      const n3_interp = n3 + rxf * (n6 - n3)
      const n4_interp = this.perlin[(of + PerlinNoise3D.PERLIN_YWRAP + PerlinNoise3D.PERLIN_ZWRAP) & PerlinNoise3D.PERLIN_SIZE]
      if (!n4_interp) throw new Error('something is undefined when unwrapping this.perlin')

      const n3n4_interp = n3_interp + ryf * (n4_interp - n3_interp)

      const noise = n1n2_interp + scaled_cosine(zf) * (n3n4_interp - n1n2_interp)
      r += noise * ampl
      ampl *= this.perlin_amp_falloff

      xi <<= 1
      xf *= 2
      yi <<= 1
      yf *= 2
      zi <<= 1
      zf *= 2

      if (xf >= 1.0) {
        xi++
        xf--
      }
      if (yf >= 1.0) {
        yi++
        yf--
      }
      if (zf >= 1.0) {
        zi++
        zf--
      }
    }

    return r
  }
}

export default PerlinNoise3D
