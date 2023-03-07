<script lang="ts" setup>
// @ts-expect-error não existe tipagem
import VueCardFormat from 'vue-credit-card-validation/src/validation'
import type { CreditCardBrands } from '~~/types/payment'

const props = defineProps({
  cardOwner: {
    type: String,
    required: false,
  },
  cardNumber: {
    type: [String, Number],
    required: false,
    default: '',
  },
  cardCvv: {
    type: [String, Number],
    required: false,
    default: '123',
  },
  cardExpiration: {
    type: [String, Number],
    required: false,
    default: '**/**',
  },
})

const emit = defineEmits(['brand'])

const cardBrand = computed((): CreditCardBrands => {
  const brand: CreditCardBrands = VueCardFormat.cardType(props.cardNumber)
  if (brand)
    return brand

  const regexElo = /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^504175|^627780|^63(6297|6368|6369)|(65003[5-9]|65004[0-9]|65005[01])|(65040[5-9]|6504[1-3][0-9])|(65048[5-9]|65049[0-9]|6505[0-2][0-9]|65053[0-8])|(65054[1-9]|6505[5-8][0-9]|65059[0-8])|(65070[0-9]|65071[0-8])|(65072[0-7])|(65090[1-9]|6509[1-6][0-9]|65097[0-8])|(65165[2-9]|6516[67][0-9])|(65500[0-9]|65501[0-9])|(65502[1-9]|6550[34][0-9]|65505[0-8])|^(506699|5067[0-6][0-9]|50677[0-8])|^(509[0-8][0-9]{2}|5099[0-8][0-9]|50999[0-9])|^65003[1-3]|^(65003[5-9]|65004\d|65005[0-1])|^(65040[5-9]|6504[1-3]\d)|^(65048[5-9]|65049\d|6505[0-2]\d|65053[0-8])|^(65054[1-9]|6505[5-8]\d|65059[0-8])|^(65070\d|65071[0-8])|^65072[0-7]|^(65090[1-9]|65091\d|650920)|^(65165[2-9]|6516[6-7]\d)|^(65500\d|65501\d)|^(65502[1-9]|6550[3-4]\d|65505[0-8])/
  const isElo = regexElo.test(props.cardNumber.toString())
  return isElo ? 'elo' : undefined
})

const brandLogo = computed(() => {
  const cardBrandToClass: Record<CreditCardBrands, string> = {
    visa: 'creditCardBrands/visa',
    mastercard: 'creditCardBrands/mastercard',
    amex: 'creditCardBrands/amex',
    elo: 'creditCardBrands/elo',
  }

  return cardBrandToClass[cardBrand.value]
})

watchEffect(() => {
  emit('brand', cardBrand)
})
</script>

<template>
  <div class="card">
    <div class="flip-target">
      <div class="front">
        <Icon v-if="brandLogo" :name="brandLogo" filled class="logo text-h2" color="primary" />
        <div class="chip">
          <div class="chip-line" />
          <div class="chip-line" />
          <div class="chip-line" />
          <div class="chip-line" />
          <div class="chip-main" />
        </div>
        <svg
          class="wave"
          viewBox="0 3.71 26.959 38.787"
          width="24"
          height="24"
          fill="white"
        >
          <path
            d="M19.709 3.719c.266.043.5.187.656.406 4.125 5.207 6.594 11.781 6.594 18.938 0 7.156-2.469 13.73-6.594 18.937-.195.336-.57.531-.957.492a.9946.9946 0 0 1-.851-.66c-.129-.367-.035-.777.246-1.051 3.855-4.867 6.156-11.023 6.156-17.718 0-6.696-2.301-12.852-6.156-17.719-.262-.317-.301-.762-.102-1.121.204-.36.602-.559 1.008-.504z"
          />
          <path
            d="M13.74 7.563c.231.039.442.164.594.343 3.508 4.059 5.625 9.371 5.625 15.157 0 5.785-2.113 11.097-5.625 15.156-.363.422-1 .472-1.422.109-.422-.363-.472-1-.109-1.422 3.211-3.711 5.156-8.551 5.156-13.843 0-5.293-1.949-10.133-5.156-13.844-.27-.309-.324-.75-.141-1.114.188-.367.578-.582.985-.542h.093z"
          />
          <path
            d="M7.584 11.438c.227.031.438.144.594.312 2.953 2.863 4.781 6.875 4.781 11.313 0 4.433-1.828 8.449-4.781 11.312-.398.387-1.035.383-1.422-.016-.387-.398-.383-1.035.016-1.421 2.582-2.504 4.187-5.993 4.187-9.875 0-3.883-1.605-7.372-4.187-9.875-.321-.282-.426-.739-.266-1.133.164-.395.559-.641.984-.617h.094zM1.178 15.531c.121.02.238.063.344.125 2.633 1.414 4.437 4.215 4.437 7.407 0 3.195-1.797 5.996-4.437 7.406-.492.258-1.102.07-1.36-.422-.257-.492-.07-1.102.422-1.359 2.012-1.075 3.375-3.176 3.375-5.625 0-2.446-1.371-4.551-3.375-5.625-.441-.204-.676-.692-.551-1.165.122-.468.567-.785 1.051-.742h.094z"
          />
        </svg>
        <div class="card-number">
          <div class="section">
            {{ cardNumber ? cardNumber.toString().slice(0, 4) : 'xxxx' }}
          </div>
          <div class="section">
            {{ cardNumber ? cardNumber.toString().slice(4, 8) : 'xxxx' }}
          </div>
          <div class="section">
            {{ cardNumber ? cardNumber.toString().slice(8, 12) : 'xxxx' }}
          </div>
          <div class="section">
            {{ cardNumber ? cardNumber.toString().slice(12, 16) : 'xxxx' }}
          </div>
        </div>
        <div class="card-holder">
          <div>
            <p>NOME NO CARTÃO</p>
            <h5>
              {{ cardOwner }}
            </h5>
          </div>
          <div class="text-right">
            <p>Validade</p>
            <h5>
              {{ cardExpiration || '**/**' }}
            </h5>
          </div>
        </div>
      </div>
      <div class="back">
        <div class="strip-black" />
        <div class="ccv">
          <label>CVV</label>
          <div>{{ cardCvv || '123' }}</div>
        </div>
        <div class="terms">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, repellat cumque! Vitae nostrum doloremque eligendi impedit culpa id reiciendis, explicabo consectetur, odit .</p>
          <p>Use of this card is subject to the credit card agreement.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    width: 100%;
    max-width: 400px;
    height: 250px;
    perspective: 1000;

    .flip-target {
      width: inherit;
      height: inherit;
      transition: 0.7s;
      transform-style: preserve-3d;

      .front,
      .back {
        position: absolute;
        width: inherit;
        height: inherit;
        border-radius: 15px;
        color: #fff;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
        box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.3);
        backface-visibility: hidden;
        background-image: linear-gradient(
          to right,
          #00369C,
          #4A6AA7
        );
        overflow: hidden;
      }

      .front {
        transform: translateZ(0);

        .logo {
          position: absolute;
          top: 30px;
          right: 25px;
          height: 40px;
        }

        .chip {
          position: relative;
          top: 60px;
          left: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 40px;
          border-radius: 5px;
          background-image: linear-gradient(to bottom left, #ffecc7, #d0b978);
          overflow: hidden;

          .chip-line {
            position: absolute;
            width: 100%;
            height: 1px;
            background-color: #333;

            &:nth-child(1) {
              top: 13px;
            }
            &:nth-child(2) {
              top: 20px;
            }
            &:nth-child(3) {
              top: 28px;
            }

            &:nth-child(4) {
              left: 25px;
              width: 1px;
              height: 50px;
            }
          }
          .chip-main {
            width: 20px;
            height: 25px;
            border: 1px solid #333;
            border-radius: 3px;
            background-image: linear-gradient(to bottom left, #efdbab, #e1cb94);
            z-index: 1;
          }
        }

        .wave {
          position: relative;
          top: 28px;
          left: 100px;
        }
        .card-number {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 50px 25px 10px;
          font-size: 24px;
          font-family: 'OCR', monospace;
        }

        .card-holder {
          margin: 30px 25px 0px;
          text-transform: uppercase;
          display: flex;
          justify-content: space-between;

          p {
            font-size: 8px;
          }

          h5 {
             font-family: 'OCR', monospace;
          }
        }
      }

      .back {
        transform: rotateY(180deg) translateZ(0);
        background: #9e9e9e;
        .strip-black {
          position: absolute;
          top: 30px;
          left: 0;
          width: 100%;
          height: 50px;
          background: black;
        }
        .ccv {
          position: absolute;
          top: 110px;
          left: 0;
          right: 0;
          height: 36px;
          width: 90%;
          padding: 10px;
          margin: 0 auto;
          border-radius: 5px;
          text-align: right;
          letter-spacing: 1px;
          color: #000;
          background: white;

          label {
            display: block;
            margin: -30px 0 15px;
            font-size: 10px;
            text-transform: uppercase;
            color: white;
          }
        }
        .terms {
          position: absolute;
          top: 150px;
          padding: 20px;
          font-size: 10px;
          text-align: justify;
        }
      }
    }

    &.flip .flip-target{
      transform: rotateY(180deg);
    }
  }
</style>
