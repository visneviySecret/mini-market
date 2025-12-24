<template>
  <div class="payment-page">
    <div class="payment-container">
      <h1 class="payment-title">Оплата заказа</h1>

      <div v-if="!paymentUrl" class="order-summary">
        <div class="summary-item">
          <span class="label">Сумма заказа:</span>
          <span class="value">{{ getFormatNumber(cartStats.cost) }} ₽</span>
        </div>
        <div class="summary-item">
          <span class="label">Товаров:</span>
          <span class="value">{{ cartStats.count }} шт.</span>
        </div>

        <button class="pay-button" @click="initPayment" :disabled="loading">
          {{ loading ? "Подготовка оплаты..." : "Перейти к оплате" }}
        </button>
      </div>

      <div v-if="paymentUrl" class="payment-frame-wrapper">
        <iframe
          :src="paymentUrl"
          class="payment-frame"
          frameborder="0"
          allowpaymentrequest
          @load="onIframeLoad"
        ></iframe>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getFormatNumber } from "@/utils/getFormatNumber";
import { createPaymentUrl } from "@/api/payment";

export default {
  data() {
    return {
      paymentUrl: null,
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters(["cartStats", "allCart"]),
    ...mapState({
      orderId: (state) => state.orderId,
    }),
  },
  methods: {
    getFormatNumber,
    async initPayment() {
      this.loading = true;
      this.error = null;

      try {
        const paymentData = {
          amount: this.cartStats.cost,
          description: `Оплата заказа`,
        };
        if (this.orderId) {
          paymentData.orderId = this.orderId;
        } else {
          paymentData.items = this.allCart.map((item) => ({
            product_id: item.product.id,
            count: item.count,
            price: item.product.price,
          }));
        }

        const response = await createPaymentUrl(paymentData);

        this.paymentUrl = response.paymentUrl || response.url;
      } catch (err) {
        this.error = "Ошибка при инициализации оплаты. Попробуйте позже.";
        console.error("Payment initialization error:", err);
      } finally {
        this.loading = false;
      }
    },
    onIframeLoad() {
      console.log("Payment iframe loaded");
    },
  },
  mounted() {
    if (this.cartStats.cost === 0) {
      this.$router.push("/Cart");
    }
  },
};
</script>

<style scoped lang="scss">
.payment-page {
  min-height: calc(100vh - 200px);
  padding: 40px 20px;
  background: #f5f5f5;
}

.payment-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.payment-title {
  font-size: 32px;
  font-weight: 600;
  color: #1f2432;
  margin-bottom: 30px;
  text-align: center;
}

.order-summary {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 8px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }

  .label {
    font-size: 16px;
    color: #797b86;
  }

  .value {
    font-size: 18px;
    font-weight: 600;
    color: #1f2432;
  }
}

.pay-button {
  width: 100%;
  margin-top: 30px;
  padding: 16px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    background: #45a049;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}

.payment-frame-wrapper {
  width: 100%;
  height: 700px;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.payment-frame {
  width: 100%;
  height: 100%;
  border: none;
}

.error-message {
  margin-top: 20px;
  padding: 15px;
  background: #ffebee;
  color: #c62828;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
}

@media (max-width: 768px) {
  .payment-container {
    padding: 20px;
  }

  .payment-title {
    font-size: 24px;
  }

  .order-summary {
    padding: 20px;
  }

  .payment-frame-wrapper {
    height: 600px;
  }
}
</style>
