<template>
    <footer>
        <div class="footer-content">
            <p>© 2023 Your Ecommerce Company. All rights reserved.</p>
            <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
        </div>
    </footer>
</template>
  
<script>
export default {
    name: 'AppFooter'
}
</script>
  
<style scoped>
footer {
    background-color: #f8f9fa;
    padding: 20px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-content p {
    margin: 0;
}

.footer-content ul {
    list-style: none;
    display: flex;
    gap: 10px;
    padding: 0;
    margin: 0;
    padding-right: 40px;
}

.footer-content ul li a {
    color: #333;
    text-decoration: none;
}
</style>
  