    class OrderDaoMemory {
        constructor() {
          this.order = [];
          this.cont = 1;
        }
      
        init() {
          console.log("Order dao in memory -> ready!");
        }
      
        disconnect() {
          console.log("Order dao in memory -> closed!");
        }
      
        getIndex(id) {
          return this.order.findIndex((order) => order.id == id);
        }
      
        async write(datos) {
          try {
            return this.order.push(datos);
          } catch (err) {
            throw new Error(err?.message);;
          }
        }
      
        async save(obj) {
          const newOrder = { ...obj, id: this.cont++ };
          this.order.push(newOrder);
          return newOrder;
        }
      
        async getById(id) { 
          try {
            return this.order.find((item) => item.id == id);
          } catch (err) {
            throw new Error(err?.message);;
          }
        }

        async getByEmail(email) {
          try { 
            return await this.order.filter(item => item.buyer_email == email);
          } catch (err) {
            throw new Error(err?.message);
          }
        }
      
        async getAll() {
          return this.order;
        }
      
        async deleteById(id) {
          try {
            const order = getById(id);
            const orders = getAll();
      
            if (!order) {
              return;
            }
      
            if (!orders) {
              return;
            }
      
            this.order = this.order.filter((obj) => obj.id !== order.id);
            return;
          } catch (err) {
            throw new Error(err?.message);
          }
        }
      
        async deleteAll() {
          try {
            return (this.order = []);
          } catch (err) {
            throw new Error(err?.message);;
          }
        }
    
      }

      export default OrderDaoMemory;
      