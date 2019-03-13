<template>
  <footer id="DefaultFooter">
    <div class="container center-text">

      <div class="logo-wrapper">
        <a class="logo" href="#"><img src="images/logo-black.png" alt="Logo Image"></a>
        <i class="icon icon-star"></i>
      </div>

      <div class="newsletter">
        <h4 class="title">RECEIVE NEWS IN YOUR EMAIL</h4>
        <p>Join our mailing list to receive news and announcements</p>
        <div class="email-area">
          <form>
            <input class="email-input" type="text" placeholder="Your Email">
            <button class="submit-btn" type="submit"><i class="icon icon-email-plane"></i></button>
          </form>
        </div>
        <!-- email-area -->
      </div>
      <!-- newsletter -->


      <ul class="social-icons">
        <li><a href="#"><i class="icon icon-heart"></i></a></li>
        <li><a href="#"><i class="icon icon-twitter"></i></a></li>
        <li><a href="#"><i class="icon icon-instagram"></i></a></li>
        <li><a href="#"><i class="icon icon-pinterest"></i></a></li>
        <li><a href="#"><i class="icon icon-tripadvisor"></i></a></li>
      </ul>

      <ul class="footer-links">
        <li><a href="#">HOME</a></li>
        <li><a href="#">OUR STORIES</a></li>
        <li><a href="#">THE WEDDING</a></li>
        <li><a href="#">GALLERY</a></li>
        <li><a href="#">CONTACT</a></li>
      </ul>

      <p class="copyright">
        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
        Copyright &copy;2019 All rights reserved | This template is made with <i class="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
      </p>

    </div>
    <!-- container -->
  </footer>
</template>

<script>
  export default {
    name: 'DefaultFooter',
    components: {},
    props: {},
    computed: {},
    mounted: function() {},
    methods: {}
  }
</script>
