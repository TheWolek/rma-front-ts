<script setup lang="ts"></script>
<template>
  <div class="infoSection">
    <h1>Zgłoś swoje urządzenie do naprawy w serwisie</h1>
    <p>
      Obsługujemy większość elektroniki. Po utworzeniu zgłoszenia skontaktujemy
      się z Tobą by ustalić szczegóły
    </p>
    <div class="steps">
      <div class="step">
        <img src="@/assets/logo.png" />
        <div class="stepText">
          <h3>1. Utwórz zgłoszenie</h3>
          <p>
            Kiedy przyjmiemy Twoje zgłoszenie, wyślemy Ci wiadomość mailem.
            Podamy w niej Twój numer zgłoszenia (numer RMA) oraz instrukcje, co
            zrobić dalej
          </p>
        </div>
      </div>
      <div class="step">
        <img src="@/assets/logo.png" />
        <div class="stepText">
          <h3>2. Nadaj paczkę</h3>
          <p>
            Wyślemy Ci instrukcje, jak zapakować i wysłać paczkę do naszego
            serwisu.
          </p>
        </div>
      </div>
      <div class="step">
        <img src="@/assets/logo.png" />
        <div class="stepText">
          <h3>3. Naprawiamy Twoje urządzenie</h3>
          <p>
            Gdy dostaniemy Twoją przesyłkę, poinformujemy Cię o ty mailowo. O
            dalszym przebiegu będziemy Cię informować na bieżąco oraz na stronie
            <RouterLink :to="{ name: 'clientPanel' }"
              >statusu zgłoszenia</RouterLink
            >
          </p>
        </div>
      </div>
    </div>
    <h1>Formularz zgłoszeniowy</h1>
  </div>
</template>
<style scoped lang="scss">
h1,
h3,
p {
  color: var(--vt-c-black-mute);
}
a {
  color: var(--vt-c-blue);
  font-weight: 600;
}

.infoSection {
  margin-bottom: 16px;

  h1 {
    font-weight: 600;
  }

  p {
    font-size: 14px;
  }

  .steps {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .step {
      display: flex;
      gap: 20px;
      background-color: #f3f3f3;
      padding: 10px 16px;
      border-radius: 8px;
      max-width: 700px;

      img {
        width: 60px;
        height: 60px;
        align-self: flex-start;
      }

      .stepText {
        h3 {
          font-weight: 600;
          font-size: 16px;
        }

        p {
          font-size: 14px;
        }
      }
    }
  }
}
@media (min-width: 1024px) {
  .infoSection {
    margin-bottom: 26px;

    h1 {
      font-size: 26px !important;
    }

    .steps {
      .step {
        img {
          width: 70px;
          height: 70px;
        }

        .stepText {
          h3 {
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
