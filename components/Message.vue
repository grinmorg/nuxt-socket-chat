<template>
    <div>
        <div v-if="name === 'admin'" class="system">
            <p class="text-xs-center">{{ text }}</p>
            <hr>
        </div>
        <div v-else class="wrap">
            <div class="message" :class="{owner}">
                <small>
                    <strong>{{ name }}</strong>
                </small>
                <p> {{ text }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        text: String,
        owner: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="stylus" scoped>
.system {
    margin-bottom: 1rem;
    p {
        margin-bottom: 1rem;
    }
}
.wrap {
    margin-top: .5rem;
    display: flex;
    flex-direction: column;
}

.message {
    padding: 1rem;
    width: 60%;
    margin: 0 1rem;
    box-shadow: 0 1px 0 0 rgba(50, 50, 50, .3);
    border-radius 4px;
    background: #1976d2;
    position: relative;
    
    p {
        margin-bottom: 0;
        span {
            color="primary"
        }
    }
}

.owner {
    background: #fff;
    color: #000;
    align-self: flex-end;
}
</style>